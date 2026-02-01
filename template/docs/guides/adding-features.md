# Adding New Features

Guide for extending your Agentic App with new features.

## Adding a New Page

### 1. Create Page File

```typescript
// src/app/my-feature/page.tsx
export default function MyFeaturePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">My Feature</h1>
      <p>Feature content here</p>
    </div>
  );
}
```

### 2. Add to Navigation (Optional)

```typescript
// src/components/site-header.tsx
<Link href="/my-feature">My Feature</Link>
```

### 3. Make it Protected (Optional)

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyFeaturePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  return <div>Protected content</div>;
}
```

## Adding API Routes

### 1. Create Route Handler

```typescript
// src/app/api/my-endpoint/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Validation schema
const requestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    // 1. Check authentication
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse and validate
    const body = await req.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 3. Business logic
    const { name, email } = result.data;
    // Do something...

    // 4. Return response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 2. Add Rate Limiting (Optional)

```typescript
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limit: 10 requests per minute
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = rateLimit({
    identifier: ip,
    limit: 10,
    window: 60 * 1000, // 1 minute
  });

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
        limit,
        remaining,
        reset,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  // Rest of the handler...
}
```

## Adding Database Tables

### 1. Update Schema

```typescript
// src/lib/schema.ts
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
```

### 2. Generate Migration

```bash
pnpm db:generate
```

### 3. Review Generated Migration

```sql
-- drizzle/0001_*.sql
CREATE TABLE "posts" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "content" text NOT NULL,
  "author_id" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_user_id_fk"
  FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE;
```

### 4. Run Migration

```bash
pnpm db:migrate
```

### 5. Use in Code

```typescript
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { nanoid } from "nanoid";

// Create
const newPost = await db.insert(posts).values({
  id: nanoid(),
  title: "My Post",
  content: "Post content",
  authorId: session.user.id,
}).returning();

// Read
const allPosts = await db.select().from(posts);

// Update
await db
  .update(posts)
  .set({ title: "Updated Title" })
  .where(eq(posts.id, postId));

// Delete
await db.delete(posts).where(eq(posts.id, postId));
```

## Adding UI Components

### 1. Use shadcn/ui

```bash
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
```

### 2. Create Custom Component

```typescript
// src/components/my-component.tsx
interface MyComponentProps {
  title: string;
  children: React.ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
```

### 3. Use Component

```typescript
import { MyComponent } from "@/components/my-component";

<MyComponent title="Hello">
  <p>Content here</p>
</MyComponent>
```

## Adding Authentication Features

### Email Verification Flow

Already included! Users get verification email on signup.

### Password Reset Flow

Already included! Users can reset password via forgot-password page.

### Adding OAuth Provider (GitHub example)

1. **Get OAuth Credentials:**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set callback URL: `https://yourdomain.com/api/auth/callback/github`

2. **Update Auth Config:**

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  // ...existing config
  socialProviders: {
    google: { /* existing */ },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: Boolean(
        process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ),
    },
  },
});
```

3. **Add Environment Variables:**

```env
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

4. **Add Sign In Button:**

```typescript
import { signIn } from "@/lib/auth-client";

<Button
  onClick={() => signIn.social({ provider: "github" })}
>
  Sign in with GitHub
</Button>
```

## Adding File Upload

### 1. Create Upload API Route

```typescript
// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { upload } from "@/lib/storage";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type and size
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  // Upload file
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await upload(buffer, file.name, "uploads");

  return NextResponse.json({ url: result.url });
}
```

### 2. Create Upload Form

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function UploadForm() {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success("File uploaded!");
      console.log("File URL:", data.url);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        name="file"
        accept="image/*"
        required
        disabled={uploading}
      />
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
```

## Best Practices

### 1. Always Validate Inputs

Use Zod schemas for all user inputs:

```typescript
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
});
```

### 2. Handle Errors Properly

```typescript
try {
  // risky operation
} catch (error) {
  console.error("Operation failed:", error);
  return NextResponse.json(
    { error: "Operation failed" },
    { status: 500 }
  );
}
```

### 3. Use Environment Variables

Never hardcode secrets:

```typescript
// ❌ Bad
const apiKey = "sk-1234567890";

// ✅ Good
const apiKey = process.env.MY_API_KEY;
if (!apiKey) {
  throw new Error("MY_API_KEY not set");
}
```

### 4. Type Everything

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(): User {
  // ...
}
```

### 5. Keep Components Small

One component, one responsibility:

```typescript
// ❌ Bad: 500 line component

// ✅ Good: Split into smaller components
<UserProfile>
  <UserAvatar />
  <UserInfo />
  <UserActions />
</UserProfile>
```

## Testing Your Features

### Manual Testing

```bash
# 1. Start dev server
pnpm dev

# 2. Test in browser
open http://localhost:3000/my-feature

# 3. Check console for errors
# 4. Test auth flows
# 5. Test error cases
```

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Build Test

```bash
pnpm build
```

## Need Help?

- Check existing code for patterns
- Read the docs in `docs/`
- Open an issue on GitHub
