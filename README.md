# create-agentic-app

<div align="center">

**Production-ready Next.js 16 boilerplate with AI, authentication, and database**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

[Quick Start](#quick-start) • [Features](#features) • [Documentation](#documentation)

</div>

## What's This?

The fastest way to start building AI-powered applications with Next.js. Skip the boilerplate setup and jump straight into building features.

```bash
npx create-agentic-app my-app
cd my-app
pnpm install
pnpm dev
```

## ✨ Features

- **🤖 AI Chat** - Streaming responses with 100+ models via OpenRouter
- **🔐 Authentication** - Email/password + Google OAuth with BetterAuth
- **💾 Database** - PostgreSQL + Drizzle ORM with type safety
- **🎨 UI Components** - shadcn/ui + Tailwind CSS 4 + dark mode
- **⚡ Next.js 16** - App Router, Server Components, React 19
- **📱 Responsive** - Mobile-first design
- **🔒 Secure** - Built-in auth, validation, secure headers
- **📚 Documented** - Comprehensive guides

## Quick Start

```bash
# Create new project
npx create-agentic-app my-app
cd my-app

# Setup environment
cp .env.example .env
# Fill in: POSTGRES_URL, BETTER_AUTH_SECRET, OPENROUTER_API_KEY

# Initialize database
pnpm db:push

# Start development
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- BetterAuth + PostgreSQL + Drizzle ORM
- OpenRouter AI (100+ models)
- shadcn/ui + Tailwind CSS 4

## Documentation

See `packages/template/docs/` for full documentation:

- Setup guides
- Architecture overview
- API reference
- Deployment guides

## License

MIT
