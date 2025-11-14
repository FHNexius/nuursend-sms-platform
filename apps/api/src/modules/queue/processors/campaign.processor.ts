import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CampaignsService } from '../../campaigns/campaigns.service';
import { SupabaseService } from '../../../database/supabase.service';
import { SmsFacade } from '@nuursend/sms-core';
import { SMS_FACADE_PROVIDER } from '../../sms/providers/sms-facade.provider';

@Processor('campaigns')
@Injectable()
export class CampaignProcessor {
  constructor(
    @Inject(forwardRef(() => CampaignsService)) private campaignsService: CampaignsService,
    @Inject(SMS_FACADE_PROVIDER) private smsFacade: SmsFacade,
    private supabaseService: SupabaseService,
  ) {}

  @Process('process-campaign')
  async handleCampaign(job: Job) {
    // Process campaign sending job
    // Implementation by Codex
    const { campaignId } = job.data;
  }

  @Process('schedule-campaign')
  async handleScheduleCampaign(job: Job) {
    // Process scheduled campaign
    // Implementation by Codex
  }
}

