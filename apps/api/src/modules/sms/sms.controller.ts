import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SendSmsDto } from './dto/send-sms.dto';
import { SendBulkSmsDto } from './dto/send-bulk-sms.dto';

@Controller('api/v1/sms')
@UseGuards(JwtAuthGuard)
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(@CurrentUser() user: any, @Body() dto: SendSmsDto) {
    // Send single SMS
    // Implementation by Codex
    return this.smsService.sendSms(user.id, dto);
  }

  @Post('send-bulk')
  async sendBulkSms(@CurrentUser() user: any, @Body() dto: SendBulkSmsDto) {
    // Send bulk SMS
    // Implementation by Codex
    return this.smsService.sendBulkSms(user.id, dto);
  }

  @Get('messages')
  async getMessages(@CurrentUser() user: any, @Query() filters: any) {
    // Get user messages
    // Implementation by Codex
    return this.smsService.getMessages(user.id, filters);
  }

  @Get('messages/:id')
  async getMessageById(@CurrentUser() user: any, @Param('id') messageId: string) {
    // Get message by ID
    // Implementation by Codex
    return this.smsService.getMessageById(user.id, messageId);
  }
}

