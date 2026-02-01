# AI Chat Feature

Complete guide to the AI chat functionality powered by OpenRouter.

## Overview

The chat feature provides streaming AI responses using any model available on OpenRouter (100+ models including GPT-4, Claude, Gemini, Llama, and more).

## How It Works

```typescript
// Client sends message
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
});

// Server streams AI response
const stream = response.body;
// Client renders markdown in real-time
```

## Configuration

### Environment Variables

```env
# Required
OPENROUTER_API_KEY=sk-or-v1-...

# Optional (defaults to gpt-4o-mini)
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### Available Models

Visit [openrouter.ai/models](https://openrouter.ai/models) to browse all models.

Popular choices:
- `openai/gpt-4o-mini` - Fast, cheap, GPT-4 level
- `openai/gpt-4o` - Most capable OpenAI model
- `anthropic/claude-3.5-sonnet` - Excellent for coding
- `google/gemini-pro-1.5` - Large context window
- `meta-llama/llama-3.1-70b-instruct` - Open source

## API Endpoint

### POST /api/chat

**Request:**

```typescript
{
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
}
```

**Response:** Streaming text

**Validation:**
- Messages required (min: 1, max: 100)
- Content max length: 10,000 characters
- Authenticated users only

**Error Responses:**

```typescript
// 401 Unauthorized
{ error: "Unauthorized" }

// 400 Bad Request
{
  error: "Invalid request",
  details: {
    messages: ["Required", "Too many messages"]
  }
}

// 500 Internal Server Error
{
  error: "AI service not configured",
  message: "Please set OPENROUTER_API_KEY"
}
```

## Frontend Integration

### Using useChat Hook

```typescript
import { useChat } from 'ai/react';

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {messages.map(m => (
          <div key={m.id}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Send
      </button>
    </form>
  );
}
```

### Markdown Rendering

```typescript
import ReactMarkdown from 'react-markdown';

<ReactMarkdown>{message.content}</ReactMarkdown>
```

### Code Syntax Highlighting

```typescript
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

<ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {content}
</ReactMarkdown>
```

## Customization

### Change AI Model

Update `.env`:

```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

Or programmatically in `src/app/api/chat/route.ts`:

```typescript
const model = process.env.OPENROUTER_MODEL || "your-default-model";
```

### Adjust Streaming Settings

```typescript
const result = streamText({
  model: openrouter(model, { apiKey }),
  messages: convertToCoreMessages(messages),
  temperature: 0.7,      // Creativity (0-2)
  maxTokens: 2000,       // Max response length
  topP: 0.9,             // Nucleus sampling
  frequencyPenalty: 0.5, // Reduce repetition
});
```

### Add System Prompts

```typescript
const result = streamText({
  model: openrouter(model, { apiKey }),
  system: "You are a helpful coding assistant specializing in TypeScript and React.",
  messages: convertToCoreMessages(messages),
});
```

### Context Management

```typescript
// Keep only last 10 messages for context
const contextMessages = messages.slice(-10);

const result = streamText({
  model: openrouter(model, { apiKey }),
  messages: convertToCoreMessages(contextMessages),
});
```

## Error Handling

### Retry Logic

```typescript
async function sendMessage(messages, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Rate Limiting

```typescript
// TODO: Add rate limiting middleware
// Recommended: 10 messages per minute per user
```

## Cost Optimization

### Model Selection
- Use `gpt-4o-mini` for general chat (cheap, fast)
- Use `gpt-4o` only when needed (expensive, better)
- Use open source models for privacy (Llama, Mistral)

### Token Management
```typescript
// Limit response length
maxTokens: 1000  // ~750 words

// Trim context
messages: messages.slice(-5)  // Last 5 messages only
```

## Testing

### Manual Test

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "messages": [
      { "role": "user", "content": "Hello!" }
    ]
  }'
```

### Unit Test (Vitest)

```typescript
import { POST } from '@/app/api/chat/route';

describe('/api/chat', () => {
  it('requires authentication', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
```

## Advanced Features

### Tool Calling
```typescript
// Add tools to AI (OpenAI function calling)
const result = streamText({
  model: openrouter(model),
  messages,
  tools: {
    getWeather: {
      description: 'Get current weather',
      parameters: z.object({
        city: z.string(),
      }),
      execute: async ({ city }) => {
        // Fetch weather
      },
    },
  },
});
```

### Multi-Modal (Image Input)

```typescript
messages: [
  {
    role: 'user',
    content: [
      { type: 'text', text: 'What's in this image?' },
      { type: 'image', image: imageUrl }
    ]
  }
]
```

## Troubleshooting

### API Key Not Working
- Verify key at [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
- Check for typos in `.env`
- Restart dev server after env changes

### Streaming Not Working
- Check browser supports EventSource/fetch streaming
- Verify no proxy blocking streaming
- Test with curl first

### Slow Responses
- Try different model (gpt-4o-mini is faster)
- Reduce maxTokens
- Check OpenRouter status page

### Rate Limits
- OpenRouter has per-model limits
- Add user-level rate limiting
- Cache common responses
