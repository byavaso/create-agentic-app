# Quick Start Guide

Get your Agentic App up and running in under 5 minutes.

## Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database (local or cloud)

## Installation

```bash
# Install pnpm if you haven't
npm install -g pnpm

# Install dependencies
pnpm install
```

## Environment Setup

1. **Copy environment template:**

```bash
cp .env.example .env
```

2. **Generate auth secret:**

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

3. **Fill in required values:**

```env
# Required
POSTGRES_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=<your-generated-secret>

# Required for AI chat
OPENROUTER_API_KEY=<get-from-openrouter.ai>

# Optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Database Setup

### Option A: Local PostgreSQL with Docker

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=agentic \
  -p 5432:5432 \
  postgres:16-alpine

# Update .env
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/agentic
```

### Option B: Neon (Serverless PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `.env`

## Initialize Database

```bash
# Push schema to database
pnpm db:push

# Verify with Drizzle Studio (optional)
pnpm db:studio
```

## Start Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Next Steps

- [Environment Variables Guide](./environment-setup.md)
- [Database Setup Deep Dive](./database-setup.md)
- [Troubleshooting](./troubleshooting.md)

## Common Issues

### Database Connection Failed

```bash
# Test database connection
psql $POSTGRES_URL

# If fails, verify:
# 1. PostgreSQL is running
# 2. Credentials are correct
# 3. Database exists
```

### Auth Secret Too Short

```bash
# Generate new 32-char secret
openssl rand -base64 32
```

### Port 3000 Already in Use

```bash
# Use different port
PORT=3001 pnpm dev
```
