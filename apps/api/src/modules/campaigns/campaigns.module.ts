import { Module, forwardRef } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { SupabaseModule } from '../../database/supabase.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => QueueModule),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}

