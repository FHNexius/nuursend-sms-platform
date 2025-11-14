import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SmsProcessor } from './processors/sms.processor';
import { CampaignProcessor } from './processors/campaign.processor';
import { SmsModule } from '../sms/sms.module';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { SupabaseModule } from '../../database/supabase.module';
import { smsFacadeProvider } from '../sms/providers/sms-facade.provider';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({ name: 'sms' }),
    BullModule.registerQueue({ name: 'campaigns' }),
    SupabaseModule,
    forwardRef(() => SmsModule),
    forwardRef(() => CampaignsModule),
  ],
  providers: [SmsProcessor, CampaignProcessor, smsFacadeProvider],
  exports: [BullModule],
})
export class QueueModule {}

