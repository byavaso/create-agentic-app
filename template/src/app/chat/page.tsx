"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { UserProfile } from "@/components/auth/user-profile";
import { useSession } from "@/lib/auth-client";
import type { Components } from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
}

// Markdown component styling
const markdownComponents: Components = {
  h1: (props) => <h1 className="mt-2 mb-3 text-2xl font-bold" {...props} />,
  h2: (props) => <h2 className="mt-2 mb-2 text-xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-2 mb-2 text-lg font-semibold" {...props} />,
  p: (props) => <p className="mb-3 leading-7 text-sm" {...props} />,
  ul: (props) => <ul className="mb-3 ml-5 list-disc space-y-1 text-sm" {...props} />,
  ol: (props) => <ol className="mb-3 ml-5 list-decimal space-y-1 text-sm" {...props} />,
  li: (props) => <li className="leading-6" {...props} />,
  a: (props) => (
    <a
      className="underline underline-offset-2 text-foreground hover:opacity-70"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-3 border-l-2 border-border pl-3 text-muted-foreground"
      {...props}
    />
  ),
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;

    if (isInline) {
      return (
        <code className="rounded bg-secondary/50 px-1 py-0.5 text-xs" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre className="mb-3 w-full overflow-x-auto rounded-md bg-secondary/50 p-3">
        <code className="text-xs leading-5" {...props}>
          {children}
        </code>
      </pre>
    );
  },
  hr: (props) => <hr className="my-4 border-border" {...props} />,
  table: (props) => (
    <div className="mb-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-secondary/50 px-2 py-1 text-left"
      {...props}
    />
  ),
  td: (props) => <td className="border border-border px-2 py-1" {...props} />,
};

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:bg-secondary/50 rounded transition-colors"
      title="Copy to clipboard"
      aria-label="Copy message to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 max-w-[80%]">
      <Loader2 className="h-4 w-4 animate-spin opacity-60" />
      <span className="text-sm text-muted-foreground">Thinking...</span>
    </div>
  );
}

const STORAGE_KEY = "chat-messages";

function ChatContent() {
  const { data: session, isPending } = useSession();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      let assistantContent = "";
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantContent }
              : m
          )
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      toast.error(`Failed to send message: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Chat cleared");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-5 h-5 animate-spin opacity-60" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <UserProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            AI Chat
          </h1>
          <p className="text-muted-foreground">
            Logged in as {session.user.name}
          </p>
        </header>

        {/* Controls */}
        {messages.length > 0 && (
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={clearMessages}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear chat
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
            <p className="text-sm text-destructive">
              Error: {error}
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="min-h-[50vh] space-y-4 mb-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-24">
              Start a conversation with AI
            </div>
          )}
          {messages.map((message) => {
            const timestamp = message.createdAt
              ? formatTimestamp(new Date(message.createdAt))
              : null;

            return (
              <div
                key={message.id}
                className={`group p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-foreground text-background ml-auto max-w-[80%]"
                    : "bg-secondary/30 max-w-[80%]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.role === "user" ? "You" : "AI"}
                    </span>
                    {timestamp && (
                      <span className="text-xs opacity-60">{timestamp}</span>
                    )}
                  </div>
                  {message.role === "assistant" && message.content && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={message.content} />
                    </div>
                  )}
                </div>
                <div>
                  <ReactMarkdown components={markdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <ThinkingIndicator />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-4 border border-border/60 rounded-xl"
        >
          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full min-h-[80px] resize-none border-0 bg-transparent p-0 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              aria-label="Chat message input"
            />
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground/60">
                {input.length}/2000 · Ctrl+Enter to send
              </span>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-5 h-5 animate-spin opacity-60" />
            </div>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
