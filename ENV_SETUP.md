# Environment Setup Guide

## First Time Setup

1. **Copy example files:**
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env.local
   ```

2. **Get credentials:**
   - **Supabase**: Create project at https://supabase.com
     - Get URL and keys from Settings > API
   - **Twilio**: Get from https://console.twilio.com
   - **Stripe**: Get from https://dashboard.stripe.com/test/apikeys

3. **Fill in your `.env` files** with actual values

4. **Never commit `.env` files** - only commit `.env.example`

## Required Services

### Development
- Supabase (or local PostgreSQL)
- Redis (for queues)
  ```bash
  docker run -d -p 6379:6379 redis
  ```

### Production
- Supabase Production Project
- Redis (AWS ElastiCache, Upstash, etc.)
- Twilio/Telnyx accounts
- Stripe account

## Environment Variables by Service

### API (`apps/api/.env`)
- Database: Supabase credentials
- Redis: Queue system
- SMS: Provider credentials
- Stripe: Payment processing
- JWT: Token signing

### Web (`apps/web/.env.local`)
- Only `NEXT_PUBLIC_*` variables
- Never put secrets here (visible in browser)

## Security Checklist

- [ ] All `.env` files in `.gitignore`
- [ ] Only `.env.example` files committed
- [ ] Separate credentials per environment
- [ ] Production secrets in secure vault
- [ ] API keys rotated regularly
- [ ] No hardcoded secrets in code

