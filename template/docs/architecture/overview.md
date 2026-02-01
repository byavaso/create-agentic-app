# Architecture Overview

## System Design

Agentic App follows a modern full-stack architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │  Next.js │  │  React   │  │  shadcn/ui +   │   │
│  │  Pages   │  │Components│  │  Tailwind CSS  │   │
│  └────┬─────┘  └────┬─────┘  └────────┬────────┘   │
└───────┼─────────────┼──────────────────┼────────────┘
        │             │                  │
        │             │                  │
┌───────┼─────────────┼──────────────────┼────────────┐
│       ▼             ▼                  ▼            │
│  ┌─────────────────────────────────────────────┐   │
│  │           Next.js Server (Edge)              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │   API    │  │   Auth   │  │  Server  │  │   │
│  │  │  Routes  │  │  Logic   │  │   Pages  │  │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  │   │
│  └───────┼─────────────┼──────────────┼────────┘   │
└──────────┼─────────────┼──────────────┼────────────┘
           │             │              │
           ▼             ▼              │
      ┌─────────┐  ┌──────────┐        │
      │PostgreSQL│  │BetterAuth│        │
      │ Database │  │ Sessions │        │
      └──────────┘  └──────────┘        │
                                        ▼
                                  ┌──────────┐
                                  │OpenRouter│
                                  │ AI APIs  │
                                  └──────────┘
```

## Core Technologies

### Frontend
- **Next.js 16**: App Router, Server Components, Server Actions
- **React 19**: Latest features and optimizations
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: Accessible component library

### Backend
- **Next.js API Routes**: RESTful endpoints
- **BetterAuth**: Authentication & session management
- **Drizzle ORM**: Type-safe database queries
- **PostgreSQL**: Relational database
- **Zod**: Runtime validation

### AI Integration
- **Vercel AI SDK**: Streaming responses
- **OpenRouter**: Access to 100+ AI models
- **Model Agnostic**: Easy to switch providers

## Data Flow

### Authentication Flow

```
1. User submits credentials
   ↓
2. API validates with BetterAuth
   ↓
3. Session created in PostgreSQL
   ↓
4. Session cookie set
   ↓
5. User redirected to dashboard
```

### AI Chat Flow

```
1. User sends message
   ↓
2. Client sends to /api/chat
   ↓
3. Server validates session
   ↓
4. Server validates message with Zod
   ↓
5. Server calls OpenRouter API
   ↓
6. AI response streams to client
   ↓
7. Client renders markdown
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── api/                 # API Routes
│   │   ├── auth/[...all]/  # BetterAuth catch-all
│   │   ├── chat/           # AI chat endpoint
│   │   ├── health/         # Health check
│   │   └── diagnostics/    # System diagnostics
│   ├── chat/               # AI chat page
│   ├── dashboard/          # User dashboard
│   ├── profile/            # User profile
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── error.tsx           # Global error handler
│   └── not-found.tsx       # 404 page
├── components/
│   ├── auth/               # Auth components
│   │   ├── sign-in-button.tsx
│   │   ├── sign-up-form.tsx
│   │   ├── forgot-password-form.tsx
│   │   ├── reset-password-form.tsx
│   │   ├── sign-out-button.tsx
│   │   └── user-profile.tsx
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── ... (more)
│   ├── site-header.tsx     # Main navigation
│   ├── site-footer.tsx     # Footer
│   └── theme-provider.tsx  # Dark mode
└── lib/
    ├── auth.ts             # BetterAuth server config
    ├── auth-client.ts      # Client-side auth hooks
    ├── db.ts               # Database connection
    ├── schema.ts           # Drizzle schema
    ├── storage.ts          # File storage abstraction
    ├── session.ts          # Session helpers
    ├── env.ts              # Environment validation
    └── utils.ts            # Utility functions
```

## Design Patterns

### Server Components by Default
- Pages are Server Components unless marked `"use client"`
- Reduces JavaScript bundle size
- Improves initial page load

### API Route Validation
- All inputs validated with Zod schemas
- Type-safe request/response handling
- Consistent error responses

### Database Abstraction
- Drizzle ORM provides type safety
- Schema-first development
- Automatic TypeScript types

### Authentication Strategy
- Session-based with secure httpOnly cookies
- Email/password + OAuth (Google)
- Email verification & password reset flows

## Security Considerations

1. **Authentication**: Secure session management with BetterAuth
2. **Validation**: Zod schemas for all user inputs
3. **Environment**: Secrets in env variables, never committed
4. **Headers**: Secure headers in Next.js config
5. **Database**: Parameterized queries prevent SQL injection
6. **Rate Limiting**: TODO - add rate limiting middleware

## Performance Optimizations

1. **Server Components**: Reduce client-side JavaScript
2. **Streaming**: AI responses stream for better UX
3. **Database Connection Pooling**: Efficient DB connections
4. **Edge Runtime**: Fast global response times
5. **Static Generation**: Pre-render where possible

## Scalability

### Horizontal Scaling
- Stateless architecture
- Session stored in database (not memory)
- Can run multiple instances

### Database Scaling
- PostgreSQL replication for reads
- Connection pooling
- Indexing on frequently queried columns

### AI Service
- OpenRouter handles scaling
- Can switch models easily
- Fallback models possible
