# Agentic App

Production-ready Next.js 16 application with authentication, database, and AI chat.

## Quick Start

1. **Install**: `pnpm install`
2. **Configure**: `cp .env.example .env` (fill required values)
3. **Database**: `pnpm db:push`
4. **Run**: `pnpm dev`

Visit http://localhost:3000

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- BetterAuth (Email + Google OAuth)
- PostgreSQL + Drizzle ORM
- OpenRouter AI (100+ models)
- shadcn/ui + Tailwind CSS 4

## Environment Setup

```env
# Required
POSTGRES_URL=postgresql://user:password@localhost:5432/db
BETTER_AUTH_SECRET=  # openssl rand -base64 32
OPENROUTER_API_KEY=  # https://openrouter.ai/settings/keys

# Optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Scripts

```bash
pnpm dev       # Development server
pnpm build     # Production build
pnpm lint      # ESLint
pnpm typecheck # TypeScript check
pnpm db:push   # Update database schema
pnpm db:studio # Database GUI
```

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [BetterAuth Docs](https://www.better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [OpenRouter Models](https://openrouter.ai/models)
- [shadcn/ui](https://ui.shadcn.com)
