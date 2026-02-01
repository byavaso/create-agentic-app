# Deploy to Vercel

Complete guide for deploying your Agentic App to Vercel.

## Prerequisites

- GitHub/GitLab/Bitbucket repository
- Vercel account ([Sign up free](https://vercel.com/signup))
- PostgreSQL database (Neon, Supabase, or Railway)

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Step-by-Step Deployment

### 1. Prepare Repository

```bash
# Commit all changes
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel

1. Visit [vercel.com/new](https://vercel.com/new)
2. Select your repository
3. Click "Import"

### 3. Configure Environment Variables

Add these in Vercel dashboard:

```env
# Required
POSTGRES_URL=postgresql://user:password@host/dbname
BETTER_AUTH_SECRET=<32-char-random-string>
BETTER_AUTH_URL=https://your-domain.vercel.app
OPENROUTER_API_KEY=<your-key>

# Optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENROUTER_MODEL=openai/gpt-4o-mini
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

**Get BETTER_AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Deploy

Click "Deploy" - Vercel will:
1. Build your app
2. Run database migrations
3. Deploy to CDN
4. Generate preview URL

### 5. Set Up Database

Choose one of these options:

#### Option A: Neon (Recommended)

1. Create database at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to Vercel env vars as `POSTGRES_URL`
4. Redeploy

#### Option B: Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get PostgreSQL connection string
3. Add to Vercel env vars
4. Redeploy

#### Option C: Railway

1. Create database at [railway.app](https://railway.app)
2. Copy PostgreSQL URL
3. Add to Vercel env vars
4. Redeploy

### 6. Run Migrations

After first deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Run migrations
vercel env pull .env.local
pnpm db:migrate
```

Or use Vercel's build command to auto-migrate:

```json
// package.json
{
  "scripts": {
    "build": "pnpm db:migrate && next build"
  }
}
```

### 7. Set Up Custom Domain (Optional)

1. Go to Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `BETTER_AUTH_URL` to your domain

## Environment Variables Checklist

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `POSTGRES_URL` | ✅ | Neon, Supabase, or Railway |
| `BETTER_AUTH_SECRET` | ✅ | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ✅ | Your Vercel deployment URL |
| `OPENROUTER_API_KEY` | ✅ | [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) |
| `OPENROUTER_MODEL` | ❌ | Defaults to `openai/gpt-4o-mini` |
| `GOOGLE_CLIENT_ID` | ❌ | [Google Console](https://console.cloud.google.com) |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google Console |
| `BLOB_READ_WRITE_TOKEN` | ❌ | Vercel Blob Storage |

## Google OAuth Setup

1. **Create OAuth Credentials:**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create new OAuth 2.0 Client ID
   - Add authorized redirect:
     ```
     https://your-domain.vercel.app/api/auth/callback/google
     ```

2. **Add to Vercel:**
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. **Redeploy**

## File Storage Setup

### Vercel Blob

1. Create Blob store in Vercel dashboard
2. Copy token
3. Add to env vars:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

Files will automatically upload to Vercel Blob in production.

## Monitoring & Logs

### View Logs

```bash
# Real-time logs
vercel logs

# Specific deployment
vercel logs <deployment-url>
```

### Analytics

Enable in Vercel dashboard:
- Speed Insights
- Web Analytics
- Real User Monitoring

## Troubleshooting

### Build Fails

```bash
# Check build logs in Vercel dashboard
# Common issues:

# 1. Missing env vars
# → Add in Vercel dashboard

# 2. Database not accessible
# → Check POSTGRES_URL
# → Whitelist Vercel IP if needed

# 3. TypeScript errors
# → Run locally: pnpm typecheck
# → Fix errors before pushing
```

### Database Migrations Fail

```bash
# Manual migration via Vercel CLI
vercel env pull
pnpm db:migrate

# Or add to build command
{
  "scripts": {
    "build": "drizzle-kit migrate && next build"
  }
}
```

### Auth Not Working

```bash
# 1. Check BETTER_AUTH_URL matches deployment URL
# 2. Verify BETTER_AUTH_SECRET is set
# 3. For Google OAuth, check redirect URIs
# 4. Clear cookies and try again
```

### Slow Performance

```bash
# 1. Enable Edge Runtime for API routes
export const runtime = 'edge';

# 2. Use database connection pooling
# 3. Enable Vercel Speed Insights
# 4. Check OpenRouter model performance
```

## Production Checklist

Before going live:

- [ ] Environment variables set
- [ ] Database migrated
- [ ] Custom domain configured
- [ ] SSL/HTTPS enabled (automatic)
- [ ] Google OAuth redirect URIs updated
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Performance monitoring active
- [ ] Backup strategy for database
- [ ] Rate limiting implemented
- [ ] Security headers configured

## Advanced Configuration

### Custom Build Command

```json
// vercel.json
{
  "buildCommand": "pnpm db:migrate && pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install"
}
```

### Edge Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}
```

### Caching Strategy

```typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};
```

## Cost Optimization

- **Hobby Plan**: Free for personal projects
- **Pro Plan ($20/month)**:
  - Unlimited bandwidth
  - Advanced analytics
  - Better support

Database costs separate:
- Neon: Free tier, then $19/month
- Supabase: Free tier, then $25/month
- Railway: Pay-as-you-go

OpenRouter: Pay per token used.

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Neon Docs](https://neon.tech/docs)
- [OpenRouter Status](https://status.openrouter.ai)
