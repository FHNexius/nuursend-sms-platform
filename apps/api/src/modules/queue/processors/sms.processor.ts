import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Inject } from '@nestjs/common';
import { SmsFacade } from '@nuursend/sms-core';
import { SMS_FACADE_PROVIDER } from '../../sms/providers/sms-facade.provider';
import { SupabaseService } from '../../../database/supabase.service';

@Processor('sms')
@Injectable()
export class SmsProcessor {
  constructor(
    @Inject(SMS_FACADE_PROVIDER) private smsFacade: SmsFacade,
    private supabaseService: SupabaseService,
  ) {}

  @Process('send-sms')
  async handleSendSms(job: Job) {
    // Process SMS sending job
    // Implementation by Codex
    const { messageId, provider, from, to, body } = job.data;
  }

  @Process('send-bulk-sms')
  async handleSendBulkSms(job: Job) {
    // Process bulk SMS sending job
    // Implementation by Codex
  }
}

