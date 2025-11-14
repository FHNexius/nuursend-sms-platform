# Contributing Guide

## Development Workflow

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Development Servers**
   ```bash
   # Run all apps
   pnpm dev

   # Or run individually
   pnpm --filter @nuursend/web dev
   pnpm --filter @nuursend/api dev
   ```

3. **Make Changes**
   - Follow clean architecture principles
   - Write tests for new features
   - Ensure code passes linting and formatting

4. **Test Your Changes**
   ```bash
   pnpm test
   pnpm lint
   pnpm format:check
   ```

5. **Commit Changes**
   - Use conventional commit messages
   - Format: `type(scope): description`
   - Examples:
     - `feat(sms-core): add retry logic for failed SMS`
     - `fix(api): resolve authentication issue`
     - `docs(readme): update installation instructions`

## Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Format code with Prettier
- Write meaningful commit messages
- Add tests for new features

## Architecture Guidelines

### Clean Architecture Layers

1. **Domain Layer** (`domain/`)
   - Entities: Core business objects
   - Interfaces: Contracts/abstractions
   - Errors: Domain-specific exceptions

2. **Application Layer** (`application/`)
   - Use cases
   - Facades
   - Application services

3. **Infrastructure Layer** (`infrastructure/`)
   - External service integrations
   - Provider implementations
   - Data access

### SOLID Principles

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable
- **I**nterface Segregation: Many specific interfaces > one general
- **D**ependency Inversion: Depend on abstractions, not concretions

## Testing

- Write unit tests for domain logic
- Write integration tests for services
- Write E2E tests for API endpoints
- Aim for >80% code coverage

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit PR with clear description

