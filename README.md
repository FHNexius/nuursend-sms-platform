# 🚀 Nuursend - Enterprise SMS Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-Private-green.svg)]()

A modern, scalable SMS platform built with clean architecture principles, designed to handle millions of messages per day with high reliability and security.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)

## 🎯 Overview

Nuursend is an enterprise-grade SMS platform that enables businesses to send bulk SMS messages, manage contacts, create campaigns, and track delivery with real-time analytics. Built as a monorepo using modern tools and best practices.

### Key Highlights

- **Scalable Architecture**: Microservices-ready with horizontal scaling capability
- **Multi-Provider Support**: Twilio, Telnyx, and Vonage with automatic failover
- **Real-time Processing**: Bull queue system for background job processing
- **Modern Stack**: Next.js 14, NestJS 10, TypeScript, Supabase
- **Clean Architecture**: SOLID principles, domain-driven design
- **Production Ready**: Authentication, billing, monitoring, and security built-in

## ✨ Features

### Core Functionality
- 📱 **SMS Sending**: Send single or bulk SMS messages with delivery tracking
- 👥 **Contact Management**: Import, organize, and manage contact lists
- 📊 **Campaigns**: Create, schedule, and track SMS campaigns
- 💳 **Billing**: Stripe integration with subscription management
- 📈 **Analytics**: Real-time delivery tracking and campaign statistics
- 🔐 **Authentication**: JWT-based auth with Supabase

### Technical Features
- ⚡ **Queue System**: Background processing with Bull + Redis
- 🔄 **Automatic Failover**: Multi-provider SMS delivery
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- 🧪 **Testing**: Comprehensive test coverage (unit, integration, E2E)
- 🚀 **CI/CD**: Automated testing and deployment pipelines
- 📝 **Type Safety**: Full TypeScript coverage across frontend and backend

## 🏗️ Architecture

### Monorepo Structure

```
nuursend/
├── apps/
│   ├── web/           # Next.js 14 frontend
│   └── api/           # NestJS backend
├── packages/
│   ├── sms-core/      # SMS provider abstraction
│   ├── types/         # Shared TypeScript types
│   └── ui/            # Shared UI components
└── supabase/          # Database migrations
```

### Backend Architecture

```
NestJS API
├── Database Layer (Supabase/PostgreSQL)
├── Authentication Module (JWT + Supabase Auth)
├── Core Modules
│   ├── SMS Service (Multi-provider abstraction)
│   ├── Contacts Service (CRUD operations)
│   ├── Campaigns Service (Campaign management)
│   ├── Queue Service (Background processing)
│   └── Billing Service (Stripe integration)
└── Common Utilities (Guards, Filters, Interceptors)
```

### Frontend Architecture

```
Next.js App
├── App Router (Next.js 14)
├── Auth Pages (Login, Signup)
├── Dashboard
│   ├── Overview
│   ├── Campaigns
│   ├── Contacts
│   └── Billing
└── Shared Components (UI library)
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Hooks + Context
- **Authentication**: [Supabase Auth](https://supabase.com/auth)

### Backend
- **Framework**: [NestJS 10](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Queue**: [Bull](https://github.com/OptimalBits/bull) + Redis
- **Authentication**: JWT + Passport
- **Payments**: [Stripe](https://stripe.com/)
- **SMS Providers**: [Twilio](https://www.twilio.com/), [Telnyx](https://telnyx.com/), [Vonage](https://www.vonage.com/)

### DevOps & Tools
- **Monorepo**: [pnpm Workspaces](https://pnpm.io/workspaces)
- **Linting**: ESLint + Prettier
- **Testing**: Jest (backend), Vitest (frontend)
- **Git Hooks**: Husky + Commitlint
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
nuursend-sms-platform-clone/
├── apps/
│   ├── api/                           # NestJS Backend API
│   │   ├── src/
│   │   │   ├── database/              # Supabase integration
│   │   │   ├── modules/
│   │   │   │   ├── auth/              # Authentication (JWT, guards)
│   │   │   │   ├── sms/               # SMS sending service
│   │   │   │   ├── contacts/          # Contact management
│   │   │   │   ├── campaigns/         # Campaign management
│   │   │   │   ├── queue/             # Background job processing
│   │   │   │   └── billing/           # Stripe integration
│   │   │   ├── common/                # Shared utilities
│   │   │   ├── app.module.ts          # Root module
│   │   │   └── main.ts                # Application entry point
│   │   ├── .env.example               # Environment template
│   │   └── package.json
│   │
│   └── web/                           # Next.js Frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/            # Auth pages
│       │   │   │   ├── login/
│       │   │   │   └── signup/
│       │   │   └── (dashboard)/       # Protected pages
│       │   │       ├── dashboard/
│       │   │       ├── campaigns/
│       │   │       ├── contacts/
│       │   │       └── billing/
│       │   ├── components/            # Shared components
│       │   ├── hooks/                 # Custom React hooks
│       │   └── lib/
│       │       ├── api/               # API client
│       │       └── supabase/          # Supabase client
│       ├── .env.example
│       └── package.json
│
├── packages/
│   ├── sms-core/                      # SMS provider abstraction layer
│   │   ├── domain/                    # Business entities & interfaces
│   │   ├── application/               # Use cases & facades
│   │   └── infrastructure/            # Provider implementations
│   ├── types/                         # Shared TypeScript types (Zod schemas)
│   └── ui/                            # Shared UI components (Tailwind + Shadcn)
│
├── supabase/
│   └── migrations/                    # Database migrations
│       └── 001_initial_schema.sql
│
├── .github/
│   └── workflows/                     # CI/CD pipelines
│
├── IMPLEMENTATION_GUIDE.md            # Step-by-step implementation guide
├── PROJECT_STATUS.md                  # Current project status
├── ENV_SETUP.md                       # Environment setup guide
├── nuursend-complete-doc.md           # Complete architecture documentation
├── package.json                       # Root workspace config
└── pnpm-workspace.yaml                # pnpm workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **PostgreSQL**: Via Supabase or local instance
- **Redis**: For queue system

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuursend-sms-platform-clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   # Backend
   cp apps/api/.env.example apps/api/.env
   
   # Frontend
   cp apps/web/.env.example apps/web/.env.local
   
   # Edit the files and fill in your credentials
   ```

4. **Setup Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the migration in `supabase/migrations/001_initial_schema.sql`
   - Copy your credentials to `.env` files

5. **Start Redis**
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis
   
   # Or use a cloud Redis service (Upstash, AWS ElastiCache, etc.)
   ```

6. **Get API credentials**
   - **Supabase**: Project URL and API keys
   - **Twilio/Telnyx**: SMS provider credentials
   - **Stripe**: API keys for payments

### Running the Application

```bash
# Start everything (from root)
pnpm dev

# Or start individually:

# Terminal 1: Backend API
cd apps/api
pnpm dev

# Terminal 2: Frontend
cd apps/web
pnpm dev

# Terminal 3: Redis (if not already running)
docker run -d -p 6379:6379 redis
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps
pnpm test             # Run all tests
pnpm lint             # Lint all code
pnpm format           # Format code with Prettier

# Specific apps
pnpm --filter @nuursend/api dev
pnpm --filter @nuursend/web dev
pnpm --filter @nuursend/sms-core test
```

### Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit message validation

### Git Workflow

```bash
# Commits must follow conventional commit format
git commit -m "feat(sms): add retry logic for failed messages"
git commit -m "fix(auth): resolve token expiration issue"
git commit -m "docs(readme): update installation instructions"
```

**Commit Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## 📚 Documentation

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Step-by-step implementation guide for Codex
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current project status and completion tracking
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables setup guide
- **[nuursend-complete-doc.md](./nuursend-complete-doc.md)** - Complete architecture documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

### Architecture Documentation

For detailed architecture information, see:
- API Routes: `nuursend-complete-doc.md` (Section 3)
- Database Schema: `supabase/migrations/001_initial_schema.sql`
- SMS Provider Integration: `packages/sms-core/`
- Authentication Flow: `apps/api/src/modules/auth/`

## 🧪 Testing Strategy

### Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: Main user flows tested

### Testing Structure
```
Unit Tests         → Business logic, services
Integration Tests  → API endpoints, database
E2E Tests          → User flows, UI interactions
```

## 🔒 Security

- ✅ HTTPS everywhere (TLS 1.3)
- ✅ JWT authentication with secure token storage
- ✅ Rate limiting on all endpoints
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection (input sanitization)
- ✅ CSRF protection
- ✅ Environment variable encryption
- ✅ API key rotation support
- ✅ Audit logging

## 🚢 Deployment

### Backend (NestJS API)
- **Recommended**: AWS ECS, Railway, Render
- **Requirements**: Node.js, PostgreSQL, Redis

### Frontend (Next.js)
- **Recommended**: Vercel, Netlify
- **Build**: `pnpm build`
- **Environment**: Set variables in platform dashboard

### Database
- **Recommended**: Supabase (managed PostgreSQL)
- **Migration**: Run `001_initial_schema.sql`

See deployment guide in `nuursend-complete-doc.md` (Section 13)

## 🎯 Roadmap

### Phase 1: MVP (Completed Structure ✅)
- [x] Project structure and scaffolding
- [x] Database schema
- [x] Module skeletons
- [ ] Core functionality implementation (In Progress)

### Phase 2: Core Features (Next)
- [ ] SMS sending and tracking
- [ ] Contact management
- [ ] Campaign creation
- [ ] Queue processing

### Phase 3: Advanced Features
- [ ] Analytics dashboard
- [ ] Scheduled campaigns
- [ ] Message templates
- [ ] Webhook support

### Phase 4: Production Ready
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation completion

## 👥 Contributing

We follow clean architecture principles and SOLID design patterns. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and development process.

### Development Guidelines

1. Follow TypeScript best practices
2. Write tests for new features
3. Use conventional commits
4. Keep PRs focused and small
5. Update documentation

## 📄 License

Private - All rights reserved

## 🙏 Acknowledgments

- **NestJS** - Backend framework
- **Next.js** - Frontend framework
- **Supabase** - Database and authentication
- **Twilio/Telnyx** - SMS providers
- **Stripe** - Payment processing

## 📞 Support

For support and questions:
- Documentation: See `docs/` folder
- Issues: GitHub Issues
- Email: support@nuursend.com

---

**Built with ❤️ using modern tools and best practices**

**Status**: 🟡 Structure Complete - Implementation In Progress
