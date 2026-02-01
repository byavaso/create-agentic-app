import { headers } from "next/headers";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Message validation schema
 */
const messageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().max(10000, "Message too long"),
});

/**
 * Chat request validation schema
 */
const chatRequestSchema = z.object({
  messages: z
    .array(messageSchema)
    .min(1, "At least one message required")
    .max(100, "Too many messages"),
});

/**
 * Chat API endpoint with streaming support
 * Uses OpenRouter for AI model access
 */
export async function POST(req: Request) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;

    // Check OpenRouter API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "AI service not configured. Please set OPENROUTER_API_KEY." },
        { status: 500 }
      );
    }

    // Get model from env or use default
    const modelName =
      process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

    // Initialize OpenRouter with API key
    const openrouter = createOpenRouter({ apiKey });

    // Stream AI response
    const result = streamText({
      model: openrouter(modelName),
      messages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
