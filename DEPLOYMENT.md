# Deployment Guide

This guide will help you deploy the DingDing E-commerce Platform to production.

## 🚀 Quick Deployment (Vercel - Recommended)

### 1. Prerequisites
- GitHub repository with the code
- Vercel account
- PostgreSQL database (Supabase, Neon, or Railway)

### 2. Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables:**
   Add these environment variables in Vercel dashboard:
   ```
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   DATABASE_URL=your-postgresql-connection-string
   GOOGLE_CLIENT_ID=your-google-client-id (optional)
   GOOGLE_CLIENT_SECRET=your-google-client-secret (optional)
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key (optional)
   STRIPE_SECRET_KEY=your-stripe-secret-key (optional)
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret (optional)
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

### 3. Database Setup

1. **Set up PostgreSQL:**
   - Create a database on Supabase, Neon, or Railway
   - Copy the connection string
   - Add it as `DATABASE_URL` in Vercel

2. **Run Database Migrations:**
   ```bash
   # Connect to your production database
   npx prisma db push
   npx prisma db seed
   ```

## 🐳 Docker Deployment

### 1. Create Dockerfile
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Build and Run
```bash
docker build -t dingding-ecommerce .
docker run -p 3000:3000 dingding-ecommerce
```

## 🌐 Other Deployment Options

### Railway
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### AWS/GCP/Azure
1. Use container services (ECS, Cloud Run, Container Instances)
2. Set up load balancers
3. Configure auto-scaling
4. Set up monitoring

## 🔧 Environment Variables

### Required
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - Random secret for JWT
- `DATABASE_URL` - PostgreSQL connection string

### Optional
- `GOOGLE_CLIENT_ID` - For Google OAuth
- `GOOGLE_CLIENT_SECRET` - For Google OAuth
- `STRIPE_PUBLISHABLE_KEY` - For payments
- `STRIPE_SECRET_KEY` - For payments
- `STRIPE_WEBHOOK_SECRET` - For webhooks
- `UPLOADTHING_SECRET` - For file uploads
- `UPLOADTHING_APP_ID` - For file uploads
- `POSTHOG_KEY` - For analytics
- `POSTHOG_HOST` - For analytics

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled on Vercel
- View in Vercel dashboard

### PostHog
1. Create PostHog account
2. Add `POSTHOG_KEY` and `POSTHOG_HOST`
3. View analytics in PostHog dashboard

### Error Monitoring
- Consider adding Sentry for error tracking
- Monitor performance with Vercel Analytics

## 🔒 Security Checklist

- [ ] Environment variables are secure
- [ ] Database is properly secured
- [ ] HTTPS is enabled
- [ ] CORS is configured
- [ ] Rate limiting is enabled
- [ ] Input validation is working
- [ ] Authentication is working
- [ ] Authorization is working

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails:**
   - Check environment variables
   - Ensure all dependencies are installed
   - Check TypeScript errors

2. **Database Connection Issues:**
   - Verify DATABASE_URL format
   - Check database permissions
   - Ensure database is accessible

3. **Authentication Issues:**
   - Verify NEXTAUTH_URL matches your domain
   - Check NEXTAUTH_SECRET is set
   - Verify OAuth provider settings

4. **Image Loading Issues:**
   - Check image domains in next.config.js
   - Verify image URLs are accessible
   - Check CORS settings

### Getting Help

1. Check the logs in your deployment platform
2. Review the GitHub Issues
3. Contact the development team

## 📈 Performance Optimization

### Production Optimizations
- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable caching
- Use database connection pooling
- Monitor performance metrics

### Scaling
- Use horizontal scaling
- Implement caching strategies
- Optimize database queries
- Use load balancers
- Monitor resource usage
