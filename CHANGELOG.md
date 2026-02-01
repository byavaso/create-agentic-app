# Changelog

All notable changes to create-agentic-app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-01

### 🎉 Initial Release

#### Added
- **CLI Installer**: Interactive project creation with progress indicators
- **Next.js 16 Template**: Production-ready boilerplate with App Router
- **Authentication**: BetterAuth with email/password + Google OAuth
- **Database**: PostgreSQL integration with Drizzle ORM
- **AI Chat**: Streaming chat with OpenRouter (100+ models)
- **UI Components**: shadcn/ui with Tailwind CSS 4 and dark mode
- **Error Handling**: Global error boundaries and proper error pages
- **Type Safety**: Zod validation on all API routes
- **Accessibility**: ARIA labels, skip-to-content, keyboard navigation
- **Security**: Middleware with security headers, rate limiting utils
- **Documentation**: Comprehensive guides (setup, architecture, features, deployment)
- **Developer Experience**:
  - `.env.example` with full documentation
  - Health check endpoint
  - Database migrations ready
  - TypeScript strict mode
  - ESLint configuration
- **Production Ready**:
  - Error boundaries
  - 404 page
  - Not-found handling
  - Clean schema (4 core tables)
  - No debug code
  - Professional English throughout

#### Features
- 🔐 Email/password authentication
- 🔐 Google OAuth integration
- 📧 Email verification flow
- 🔑 Password reset flow
- 👤 User profile with inline editing
- 💬 AI chat with markdown rendering
- 🎨 Dark mode support
- 📱 Fully responsive design
- 🔒 Protected routes
- 💾 Type-safe database queries
- 🎨 Modern UI with shadcn/ui
- 📚 6+ comprehensive documentation pages
- ✅ Input validation with Zod
- 🚀 One-command setup

#### Tech Stack
- Next.js 16.1.1
- React 19.2.1
- TypeScript 5.9.3
- BetterAuth 1.4.5
- Drizzle ORM 0.44.7
- PostgreSQL (via Neon, Supabase, or local)
- OpenRouter AI SDK
- shadcn/ui components
- Tailwind CSS 4.1.17
- Zod 4.1.13

#### Documentation
- Quick start guide
- Architecture overview
- AI chat implementation guide
- Vercel deployment guide
- Adding features guide
- CONTRIBUTING.md
- LICENSE (MIT)

#### Quality
- Zero Turkish text (100% English)
- TypeScript strict mode
- Comprehensive error handling
- Production-ready security
- Clean, maintainable code
- No project-specific bloat

### Package Info
- **Name**: create-agentic-app
- **Version**: 1.0.0
- **License**: MIT
- **Repository**: https://github.com/batuhanyavasoglu/create-agentic-app

---

## Future Releases

### [1.1.0] - Planned
- [ ] More OAuth providers (GitHub, Discord)
- [ ] Email service examples (Resend, SendGrid)
- [ ] Stripe payment integration
- [ ] E2E tests with Playwright
- [ ] Component tests with Vitest

### [1.2.0] - Planned
- [ ] Admin dashboard
- [ ] User roles and permissions
- [ ] File upload with image optimization
- [ ] More deployment guides (Railway, Fly.io)

### [2.0.0] - Future
- [ ] Next.js 17 support (when released)
- [ ] React 20 support (when released)
- [ ] Breaking changes (if any)

---

[1.0.0]: https://github.com/batuhanyavasoglu/create-agentic-app/releases/tag/v1.0.0
