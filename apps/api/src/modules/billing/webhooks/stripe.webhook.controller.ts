import { Controller, Post, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../auth/decorators/public.decorator';
import { BillingService } from '../billing.service';

@Controller('api/v1/billing/webhooks')
export class StripeWebhookController {
  constructor(private readonly billingService: BillingService) {}

  @Public()
  @Post('stripe')
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    // Handle Stripe webhook events
    // Implementation by Codex
  }
}

