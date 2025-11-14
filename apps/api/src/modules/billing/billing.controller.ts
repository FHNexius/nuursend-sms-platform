import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('api/v1/billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  async getSubscription(@CurrentUser() user: any) {
    // Get user subscription
    // Implementation by Codex
    return this.billingService.getSubscription(user.id);
  }

  @Post('subscription')
  async createSubscription(@CurrentUser() user: any, @Body() dto: CreateSubscriptionDto) {
    // Create subscription
    // Implementation by Codex
    return this.billingService.createSubscription(user.id, dto);
  }

  @Put('subscription')
  async updateSubscription(@CurrentUser() user: any, @Body() dto: any) {
    // Update subscription
    // Implementation by Codex
    return this.billingService.updateSubscription(user.id, dto);
  }

  @Delete('subscription')
  async cancelSubscription(@CurrentUser() user: any) {
    // Cancel subscription
    // Implementation by Codex
    return this.billingService.cancelSubscription(user.id);
  }

  @Get('invoices')
  async getInvoices(@CurrentUser() user: any) {
    // Get user invoices
    // Implementation by Codex
    return this.billingService.getInvoices(user.id);
  }

  @Get('usage')
  async getUsage(@CurrentUser() user: any) {
    // Get usage statistics
    // Implementation by Codex
    return this.billingService.getUsage(user.id);
  }

  @Post('portal')
  async createCustomerPortal(@CurrentUser() user: any) {
    // Create Stripe customer portal session
    // Implementation by Codex
    return this.billingService.createCustomerPortal(user.id);
  }
}

