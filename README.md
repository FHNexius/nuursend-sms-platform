# Nuursend - SMS Platform Monorepo

A modern, scalable SMS platform built with clean architecture principles, SOLID design patterns, and a PNPM monorepo structure.

## 🏗️ Architecture

This monorepo follows clean architecture principles with clear separation of concerns:

- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases and facades
- **Infrastructure Layer**: External integrations and implementations
- **Presentation Layer**: UI and API interfaces

## 📦 Packages

### Apps

- **`apps/web`** - Next.js 14 frontend application
- **`apps/api`** - NestJS backend API

### Packages

- **`packages/ui`** - Shared UI components with Tailwind CSS and Shadcn
- **`packages/types`** - Shared Zod schemas and TypeScript types
- **`packages/sms-core`** - SMS provider abstraction layer (Twilio, Vonage, Telnyx)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0

### Installation

```bash
# Install all dependencies
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @nuursend/web dev
pnpm --filter @nuursend/api dev
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific package/app
pnpm --filter @nuursend/web build
pnpm --filter @nuursend/api build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm --filter @nuursend/sms-core test
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## 🏛️ Clean Architecture

The `packages/sms-core` package demonstrates clean architecture:

```
sms-core/
├── domain/           # Business logic (entities, interfaces, errors)
├── application/     # Use cases and facades
└── infrastructure/   # External integrations (providers, services)
```

### SOLID Principles

- **Single Responsibility**: Each provider class handles one SMS provider
- **Open/Closed**: Easy to add new providers without modifying existing code
- **Liskov Substitution**: All providers implement `ISmsProvider` interface
- **Interface Segregation**: Clean, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

## 📝 Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit and commit-msg
- **Commitlint**: Conventional commit message validation
- **Jest**: Testing framework for NestJS
- **Vitest**: Fast testing framework for Next.js and packages

## 🔧 Configuration

### SMS Providers

Configure SMS providers in your application:

```typescript
import { SmsFacade } from '@nuursend/sms-core';

const smsFacade = new SmsFacade({
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER,
  },
  vonage: {
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    fromNumber: process.env.VONAGE_FROM_NUMBER,
  },
  telnyx: {
    apiKey: process.env.TELNYX_API_KEY,
    fromNumber: process.env.TELNYX_FROM_NUMBER,
  },
});
```

### Environment Variables

Create `.env` files in respective apps:

**apps/api/.env**
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890

VONAGE_API_KEY=your_api_key
VONAGE_API_SECRET=your_api_secret
VONAGE_FROM_NUMBER=1234567890

TELNYX_API_KEY=your_api_key
TELNYX_FROM_NUMBER=+1234567890
```

## 📚 Package Structure

### `packages/types`

Shared Zod schemas for type-safe data validation across the monorepo.

### `packages/ui`

Reusable UI components built with:
- Tailwind CSS
- Shadcn/ui components
- Radix UI primitives

### `packages/sms-core`

SMS provider abstraction with:
- Clean architecture
- Multiple provider support (Twilio, Vonage, Telnyx)
- Automatic failover
- Type-safe interfaces

## 🧪 Testing

- **Unit Tests**: Vitest for packages and Next.js
- **Integration Tests**: Jest for NestJS
- **E2E Tests**: Jest for API endpoints

## 📄 License

Private - All rights reserved
