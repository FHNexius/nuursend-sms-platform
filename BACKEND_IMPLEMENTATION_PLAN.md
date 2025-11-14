# Backend Implementation Plan - Phase 1

**Status:** Ready for Codex AI Implementation  
**Priority:** High  
**Estimated Effort:** 5-7 sessions

## 🎯 Objective

Implement core backend services and API endpoints to enable SMS sending, contact management, and campaign functionality.

## 📋 Implementation Order

### Phase 1.1: Database & Authentication (Priority: Critical)

#### 1. SupabaseService - Complete Implementation
**File:** `apps/api/src/database/supabase.service.ts`

**Status:** ✅ Partially complete (initialization done)

**Additional Methods Needed:**
```typescript
// Query helpers
async query<T>(table: string, query: any): Promise<T[]>
async queryOne<T>(table: string, query: any): Promise<T | null>
async insert<T>(table: string, data: any): Promise<T>
async update<T>(table: string, id: string, data: any): Promise<T>
async delete(table: string, id: string): Promise<void>

// Transaction support
async transaction(fn: (client: SupabaseClient) => Promise<any>): Promise<any>
```

**Testing:**
- Unit tests for all CRUD operations
- Test transaction rollback
- Test error handling for invalid queries

---

#### 2. AuthService - Complete Implementation
**File:** `apps/api/src/modules/auth/auth.service.ts`

**Status:** ✅ Basic methods implemented (register, login, logout, getCurrentUser)

**Enhancements Needed:**
```typescript
// Password reset
async requestPasswordReset(email: string): Promise<void>
async resetPassword(token: string, newPassword: string): Promise<void>

// Email verification
async verifyEmail(token: string): Promise<void>
async resendVerificationEmail(userId: string): Promise<void>

// Session management
async refreshSession(refreshToken: string): Promise<{ session: Session }>
async validateSession(accessToken: string): Promise<User>

// Profile management
async updateProfile(userId: string, data: UpdateProfileDto): Promise<User>
async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>
```

**DTOs to Create:**
- `UpdateProfileDto`
- `RequestPasswordResetDto`
- `ResetPasswordDto`
- `ChangePasswordDto`

**Testing:**
- Test registration with duplicate email
- Test login with wrong password
- Test password reset flow
- Test email verification
- Test session refresh

---

#### 3. JwtStrategy - Complete Implementation
**File:** `apps/api/src/modules/auth/strategies/jwt.strategy.ts`

**Current:** Returns payload as-is

**Needed:**
```typescript
async validate(payload: any) {
  // 1. Extract user ID from payload
  // 2. Fetch user from database
  // 3. Check if user is active
  // 4. Return user object or throw UnauthorizedException
  const userId = payload.sub;
  const user = await this.supabaseService.getClient()
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (!user.data || user.error) {
    throw new UnauthorizedException('User not found');
  }
  
  return user.data;
}
```

**Testing:**
- Test valid JWT
- Test expired JWT
- Test JWT with invalid user
- Test JWT with deleted user

---

### Phase 1.2: SMS Core (Priority: Critical)

#### 4. SmsService - Complete Implementation
**File:** `apps/api/src/modules/sms/sms.service.ts`

**Current:** Empty methods

**Needed:**
```typescript
async sendSms(userId: string, dto: SendSmsDto): Promise<SendSmsResponse> {
  // 1. Validate user has credits
  // 2. Use SmsFacade to send SMS
  // 3. Save message to database
  // 4. Deduct credits from user
  // 5. Return response
}

async sendBulkSms(userId: string, dto: SendBulkSmsDto): Promise<{ jobId: string }> {
  // 1. Validate user has enough credits
  // 2. Queue bulk SMS job using Bull
  // 3. Return job ID for tracking
}

async getMessages(userId: string, filters?: MessageFilters): Promise<Message[]> {
  // 1. Build query with filters (date range, status, provider)
  // 2. Fetch from database
  // 3. Return paginated results
}

async getMessageById(userId: string, messageId: string): Promise<Message> {
  // 1. Fetch message
  // 2. Verify it belongs to user
  // 3. Return message with delivery status
}

async getMessageStats(userId: string): Promise<MessageStats> {
  // Return aggregate stats: total sent, delivered, failed, pending
}
```

**Additional Methods:**
```typescript
async updateMessageStatus(messageId: string, status: MessageStatus): Promise<void>
async getProviderStatus(): Promise<ProviderHealth[]>
async retryFailedMessage(userId: string, messageId: string): Promise<void>
```

**Testing:**
- Test SMS sending with valid data
- Test SMS sending without credits
- Test bulk SMS queueing
- Test message retrieval with filters
- Test provider failover

---

#### 5. SMS Queue Processor - Complete Implementation
**File:** `apps/api/src/modules/queue/processors/sms.processor.ts`

**Current:** Empty method bodies

**Needed:**
```typescript
@Process('send-sms')
async handleSendSms(job: Job) {
  const { messageId, provider, from, to, body } = job.data;
  
  try {
    // 1. Send SMS using SmsFacade
    const result = await this.smsFacade.sendSms({
      to,
      from,
      message: body,
      provider: provider || 'auto'
    });
    
    // 2. Update message status in database
    await this.supabaseService.getClient()
      .from('messages')
      .update({
        status: result.status,
        provider_message_id: result.id,
        sent_at: new Date()
      })
      .eq('id', messageId);
      
    return result;
  } catch (error) {
    // 3. Update status to failed
    await this.supabaseService.getClient()
      .from('messages')
      .update({ status: 'failed', error_message: error.message })
      .eq('id', messageId);
      
    throw error;
  }
}

@Process('send-bulk-sms')
async handleSendBulkSms(job: Job) {
  const { campaignId, contacts, message, from } = job.data;
  
  // 1. Loop through contacts
  // 2. Create individual SMS jobs
  // 3. Update campaign progress
  // 4. Handle rate limiting
}
```

**Testing:**
- Test successful SMS job processing
- Test failed SMS job handling
- Test bulk SMS job batching
- Test rate limiting

---

### Phase 1.3: Contacts Management (Priority: High)

#### 6. ContactsService - Complete Implementation
**File:** `apps/api/src/modules/contacts/contacts.service.ts`

**Current:** Empty methods

**Needed:**
```typescript
async createContact(userId: string, dto: CreateContactDto): Promise<Contact> {
  // 1. Validate phone number format
  // 2. Check for duplicate phone for this user
  // 3. Insert into database
  // 4. Return created contact
}

async getContacts(userId: string, filters?: ContactFilters): Promise<PaginatedResult<Contact>> {
  // 1. Build query with filters (search, tags, lists)
  // 2. Apply pagination
  // 3. Return results with total count
}

async getContactById(userId: string, contactId: string): Promise<Contact> {
  // 1. Fetch contact
  // 2. Verify ownership
  // 3. Include message history
}

async updateContact(userId: string, contactId: string, dto: UpdateContactDto): Promise<Contact> {
  // 1. Verify ownership
  // 2. Validate phone if changed
  // 3. Update record
}

async deleteContact(userId: string, contactId: string): Promise<void> {
  // 1. Verify ownership
  // 2. Soft delete (set deleted_at)
}

async importContacts(userId: string, dto: ImportContactsDto): Promise<ImportResult> {
  // 1. Parse CSV/JSON
  // 2. Validate each contact
  // 3. Bulk insert valid contacts
  // 4. Return success/error counts
}
```

**Additional Features:**
```typescript
async addToList(userId: string, contactId: string, listId: string): Promise<void>
async removeFromList(userId: string, contactId: string, listId: string): Promise<void>
async tagContact(userId: string, contactId: string, tags: string[]): Promise<void>
async searchContacts(userId: string, query: string): Promise<Contact[]>
```

**Testing:**
- Test contact creation with valid data
- Test duplicate phone number handling
- Test contact search and filtering
- Test CSV import with various formats
- Test bulk operations

---

### Phase 1.4: Campaign Management (Priority: High)

#### 7. CampaignsService - Complete Implementation
**File:** `apps/api/src/modules/campaigns/campaigns.service.ts`

**Current:** Empty methods

**Needed:**
```typescript
async createCampaign(userId: string, dto: CreateCampaignDto): Promise<Campaign> {
  // 1. Validate campaign data
  // 2. Validate user has credits for recipient count
  // 3. Create campaign record
  // 4. Return campaign with status 'draft'
}

async getCampaigns(userId: string, filters?: CampaignFilters): Promise<Campaign[]> {
  // Return campaigns with filters (status, date range)
}

async getCampaignById(userId: string, campaignId: string): Promise<Campaign> {
  // Return campaign with stats
}

async updateCampaign(userId: string, campaignId: string, dto: UpdateCampaignDto): Promise<Campaign> {
  // Only allow updates if campaign is 'draft' or 'scheduled'
}

async deleteCampaign(userId: string, campaignId: string): Promise<void> {
  // Only allow delete if campaign is 'draft'
}

async scheduleCampaign(userId: string, campaignId: string, dto: ScheduleCampaignDto): Promise<Campaign> {
  // 1. Validate scheduled time is in future
  // 2. Create Bull job with delay
  // 3. Update campaign status to 'scheduled'
}

async sendCampaign(userId: string, campaignId: string): Promise<Campaign> {
  // 1. Verify campaign is ready
  // 2. Get all recipients
  // 3. Queue campaign job
  // 4. Update status to 'sending'
}

async getCampaignStats(userId: string, campaignId: string): Promise<CampaignStats> {
  // Return: total_recipients, sent, delivered, failed, pending
}
```

**Testing:**
- Test campaign creation
- Test scheduling validation
- Test campaign sending
- Test stats calculation
- Test cancel scheduled campaign

---

#### 8. Campaign Queue Processor - Complete Implementation
**File:** `apps/api/src/modules/queue/processors/campaign.processor.ts`

**Current:** Empty method bodies

**Needed:**
```typescript
@Process('send-campaign')
async handleSendCampaign(job: Job) {
  const { campaignId } = job.data;
  
  // 1. Fetch campaign and recipients
  // 2. Create individual SMS jobs for each recipient
  // 3. Update campaign status
  // 4. Track progress
}

@Process('schedule-campaign')
async handleScheduleCampaign(job: Job) {
  // Trigger send-campaign job at scheduled time
}
```

---

### Phase 1.5: Billing (Priority: Medium)

#### 9. BillingService - Complete Implementation
**File:** `apps/api/src/modules/billing/billing.service.ts`

**Current:** Empty methods

**Needed:**
```typescript
async getSubscription(userId: string): Promise<Subscription>
async createSubscription(userId: string, dto: CreateSubscriptionDto): Promise<Subscription>
async updateSubscription(userId: string, dto: UpdateSubscriptionDto): Promise<Subscription>
async cancelSubscription(userId: string): Promise<void>
async getInvoices(userId: string): Promise<Invoice[]>
async getUsage(userId: string): Promise<UsageStats>
async createCustomerPortal(userId: string): Promise<{ url: string }>
```

**Stripe Integration:**
```typescript
async createStripeCustomer(userId: string, email: string): Promise<string>
async createCheckoutSession(userId: string, priceId: string): Promise<string>
async handleWebhook(signature: string, rawBody: Buffer): Promise<void>
```

**Testing:**
- Test Stripe customer creation
- Test subscription lifecycle
- Test webhook handling
- Test usage tracking

---

## 🧪 Testing Requirements

For each service, implement:

1. **Unit Tests** (`*.service.spec.ts`)
   - Test each method independently
   - Mock dependencies (Supabase, Bull, SMS providers)
   - Test error cases
   - Target: 80%+ coverage

2. **Integration Tests** (`*.e2e-spec.ts`)
   - Test API endpoints
   - Test with real database (test instance)
   - Test authentication
   - Test authorization

3. **Test Data**
   - Create test fixtures
   - Seed test database
   - Mock SMS provider responses

---

## 📦 Dependencies Needed

Already installed, verify:
```json
{
  "@nestjs/bull": "^10.0.1",
  "@supabase/supabase-js": "^2.39.0",
  "bull": "^4.12.0",
  "stripe": "^14.11.0",
  "twilio": "^4.19.0",
  "@vonage/server-sdk": "^3.12.0",
  "telnyx": "^2.0.0"
}
```

---

## 🔧 Environment Variables Required

Before testing, ensure these are set in `apps/api/.env`:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Redis (for Bull)
REDIS_HOST=localhost
REDIS_PORT=6379

# SMS Providers (at least one)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number

# Stripe
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

## ✅ Acceptance Criteria

Each service is considered complete when:

1. All methods implemented with proper business logic
2. Input validation using class-validator
3. Error handling with appropriate HTTP exceptions
4. Unit tests passing with 80%+ coverage
5. Integration tests passing
6. API documentation (Swagger) updated
7. Code reviewed and approved

---

## 📝 Implementation Notes for Codex

### General Guidelines

1. **Use Dependency Injection**
   ```typescript
   constructor(
     private supabaseService: SupabaseService,
     @Inject(forwardRef(() => QueueService)) private queueService: QueueService
   ) {}
   ```

2. **Error Handling**
   ```typescript
   try {
     // business logic
   } catch (error) {
     throw new BadRequestException(`Failed to create contact: ${error.message}`);
   }
   ```

3. **Input Validation**
   ```typescript
   // In DTOs
   @IsString()
   @IsNotEmpty()
   name: string;
   
   @IsPhoneNumber()
   phoneNumber: string;
   ```

4. **Database Queries**
   ```typescript
   const { data, error } = await this.supabaseService.getClient()
     .from('contacts')
     .select('*')
     .eq('user_id', userId)
     .eq('deleted_at', null);
     
   if (error) throw new InternalServerErrorException(error.message);
   ```

5. **Queue Jobs**
   ```typescript
   await this.smsQueue.add('send-sms', {
     messageId,
     provider,
     to,
     from,
     body
   }, {
     attempts: 3,
     backoff: 5000
   });
   ```

---

## 🚀 Getting Started

**For Codex AI:**

1. Start with `SupabaseService` - add helper methods
2. Move to `AuthService` - complete all auth methods
3. Implement `JwtStrategy` validation
4. Build out `SmsService` with full logic
5. Complete `SmsProcessor` for queue handling
6. Implement `ContactsService` CRUD
7. Implement `CampaignsService` lifecycle
8. Complete `CampaignProcessor`
9. Add `BillingService` Stripe integration

After each service:
- Write unit tests
- Write integration tests
- Test manually with Postman/Thunder Client
- Document any issues

---

**Ready for implementation! Start with Phase 1.1, Service #1: SupabaseService** 🎯

