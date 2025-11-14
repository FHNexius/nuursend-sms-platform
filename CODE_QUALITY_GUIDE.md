# Code Quality Guide

## 🎯 Ensuring Technical Soundness

This guide outlines best practices and tools to ensure your code is technically sound before merging.

## 📋 Pre-Commit Checklist

Before committing any code, ensure:

### 1. **Code Runs Without Errors**
```bash
# Start the application
pnpm dev

# Check for runtime errors
# Test the feature manually
```

### 2. **Linting Passes**
```bash
# Run linter
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

### 3. **Formatting is Correct**
```bash
# Check formatting
pnpm format:check

# Auto-format
pnpm format
```

### 4. **Type Checking Passes**
```bash
# Check TypeScript types
pnpm type-check
```

### 5. **Tests Pass**
```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm --filter @nuursend/api test
pnpm --filter @nuursend/web test
```

### 6. **Build Succeeds**
```bash
# Build all packages
pnpm build
```

## 🛠️ Automated Quality Checks

### Pre-Commit Hook (Already Setup)
When you run `git commit`, Husky automatically runs:
- ✅ ESLint on staged files
- ✅ Prettier formatting check
- ✅ Type checking

### Commit Message Validation
Commits must follow conventional commit format:
```bash
# Good commits
git commit -m "feat(sms): add retry logic"
git commit -m "fix(auth): resolve token expiration"
git commit -m "docs(readme): update setup instructions"

# Bad commits (will be rejected)
git commit -m "fixed bug"
git commit -m "updates"
```

## 🧪 Testing Best Practices

### Unit Tests
```typescript
// Test business logic
describe('SmsService', () => {
  it('should send SMS successfully', async () => {
    const result = await smsService.sendSms(userId, dto);
    expect(result.status).toBe('sent');
  });

  it('should handle errors gracefully', async () => {
    await expect(smsService.sendSms(userId, invalidDto))
      .rejects.toThrow('Invalid phone number');
  });
});
```

### Integration Tests
```typescript
// Test API endpoints
describe('POST /api/v1/sms/send', () => {
  it('should return 201 when SMS sent successfully', async () => {
    const response = await request(app)
      .post('/api/v1/sms/send')
      .set('Authorization', `Bearer ${token}`)
      .send({ to: '+1234567890', body: 'Test' });
    
    expect(response.status).toBe(201);
  });
});
```

### Test Coverage Goals
- **Minimum**: 70% coverage
- **Target**: 80%+ coverage
- **Critical paths**: 100% coverage

```bash
# Check coverage
pnpm test:coverage
```

## 🔍 Code Review Checklist

### Before Opening PR

1. **Self Review**
   - [ ] Read through your own code changes
   - [ ] Remove debug code (console.logs, commented code)
   - [ ] Check for typos in comments
   - [ ] Verify variable/function names are descriptive

2. **Security Check**
   - [ ] No hardcoded credentials
   - [ ] Input validation added
   - [ ] SQL injection prevention
   - [ ] XSS protection considered
   - [ ] Authentication/authorization checked

3. **Performance Check**
   - [ ] No N+1 query problems
   - [ ] Database queries optimized
   - [ ] No unnecessary loops
   - [ ] Efficient algorithms used

4. **Error Handling**
   - [ ] Try-catch blocks where needed
   - [ ] Proper error messages
   - [ ] Failed requests handled gracefully
   - [ ] Edge cases considered

## 🏗️ Architecture Best Practices

### Backend (NestJS)

**DO:**
```typescript
// ✅ Use dependency injection
@Injectable()
export class SmsService {
  constructor(private supabaseService: SupabaseService) {}
}

// ✅ Use DTOs for validation
export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  to: string;
}

// ✅ Handle errors properly
async sendSms(dto: SendSmsDto) {
  try {
    return await this.smsFacade.send(dto);
  } catch (error) {
    throw new BadRequestException('Failed to send SMS');
  }
}
```

**DON'T:**
```typescript
// ❌ Don't use any type
function sendSms(data: any) {}

// ❌ Don't ignore errors
async sendSms() {
  await this.smsFacade.send().catch(() => {});
}

// ❌ Don't hardcode values
const apiKey = "sk_test_123456";
```

### Frontend (Next.js)

**DO:**
```typescript
// ✅ Use proper error handling
const [error, setError] = useState<string | null>(null);

try {
  await sendSms(data);
} catch (err) {
  setError(err.message);
}

// ✅ Use TypeScript properly
interface Contact {
  id: string;
  phoneNumber: string;
}

// ✅ Validate on client side too
const schema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
});
```

**DON'T:**
```typescript
// ❌ Don't ignore loading states
<button onClick={handleSubmit}>Submit</button>

// ❌ Don't expose sensitive data
const apiKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY; // Wrong!

// ❌ Don't forget error boundaries
// Always wrap components in error boundaries
```

## 🔧 Tools for Code Quality

### 1. **VS Code Extensions** (Recommended)
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Error Lens
- GitLens
- TODO Highlight

### 2. **VS Code Settings** (Add to `.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

### 3. **Browser DevTools**
- React DevTools (for debugging)
- Network tab (check API calls)
- Console (no errors in production)

## 📊 Monitoring Code Quality

### During Development
```bash
# Watch for type errors
pnpm type-check --watch

# Watch for test failures
pnpm test:watch

# Watch for linting issues
pnpm lint --watch
```

### Before Push
```bash
# Run full quality check
pnpm lint && pnpm type-check && pnpm test && pnpm build
```

### In Pull Request
GitHub Actions will automatically run:
- ✅ Linting
- ✅ Type checking
- ✅ All tests
- ✅ Build verification

## 🚨 Common Issues to Avoid

### 1. **Memory Leaks**
```typescript
// ❌ Bad: Not cleaning up
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
}, []);

// ✅ Good: Cleanup
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
```

### 2. **Unhandled Promises**
```typescript
// ❌ Bad
async function fetchData() {
  fetch('/api/data'); // Promise not awaited
}

// ✅ Good
async function fetchData() {
  await fetch('/api/data');
}
```

### 3. **Inefficient Queries**
```typescript
// ❌ Bad: N+1 query
for (const user of users) {
  const messages = await getMessages(user.id);
}

// ✅ Good: Batch query
const allMessages = await getMessagesByUserIds(users.map(u => u.id));
```

## 📈 Code Quality Metrics

### What to Track
- Test coverage percentage
- Build time
- Number of linting errors/warnings
- TypeScript strict mode compliance
- Bundle size

### Tools
```bash
# Check bundle size
pnpm --filter @nuursend/web analyze

# Check dependencies for vulnerabilities
pnpm audit

# Check for outdated packages
pnpm outdated
```

## ✅ Definition of Done

Code is "done" when:
- [ ] Feature works as expected
- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Code reviewed by peer
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Performance checked
- [ ] Security reviewed

## 🎓 Learning Resources

- [NestJS Best Practices](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

**Remember**: Quality over speed. Taking time to write clean, tested code saves debugging time later! 🚀

