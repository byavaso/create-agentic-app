# Contributing to Agentic App

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork and Clone:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/create-agentic-app
   cd create-agentic-app
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Set Up Environment:**
   ```bash
   cp .env.example .env
   # Fill in required values
   ```

4. **Run Database:**
   ```bash
   docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16-alpine
   pnpm db:push
   ```

5. **Start Development:**
   ```bash
   pnpm dev
   ```

## Making Changes

### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Run `pnpm lint` before committing
- Run `pnpm typecheck` to verify types

### Commit Messages

Use conventional commits:

```
feat: add user profile editing
fix: resolve auth redirect issue
docs: update deployment guide
style: format code with prettier
refactor: simplify chat API logic
test: add profile page tests
chore: update dependencies
```

### Pull Request Process

1. **Create a Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes:**
   - Write clear, focused commits
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes:**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

4. **Push and Create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

## Areas to Contribute

### High Priority
- [ ] Rate limiting middleware
- [ ] Email service integration examples
- [ ] E2E tests with Playwright
- [ ] Component tests with Vitest
- [ ] Performance optimizations

### Documentation
- [ ] More deployment guides (Railway, Fly.io)
- [ ] Video tutorials
- [ ] Architecture diagrams
- [ ] Example use cases
- [ ] Troubleshooting guides

### Features
- [ ] Profile avatar upload
- [ ] Two-factor authentication
- [ ] Email templates
- [ ] Admin dashboard
- [ ] User roles/permissions

### Integrations
- [ ] Stripe payments
- [ ] SendGrid email
- [ ] Sentry error tracking
- [ ] Posthog analytics
- [ ] More OAuth providers

## Code Review Guidelines

We review PRs for:
- Code quality and readability
- Test coverage
- Documentation updates
- Breaking changes
- Performance implications

## Questions?

- Open an issue for bugs
- Start a discussion for features
- Join our Discord for chat

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
