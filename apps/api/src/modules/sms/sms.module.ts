import { Module, forwardRef } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SupabaseModule } from '../../database/supabase.module';
import { QueueModule } from '../queue/queue.module';
import { smsFacadeProvider } from './providers/sms-facade.provider';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => QueueModule),
  ],
  controllers: [SmsController],
  providers: [SmsService, smsFacadeProvider],
  exports: [SmsService, smsFacadeProvider],
})
export class SmsModule {}

