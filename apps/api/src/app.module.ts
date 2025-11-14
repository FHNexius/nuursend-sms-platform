import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SmsModule } from './modules/sms/sms.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { QueueModule } from './modules/queue/queue.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SmsModule,
    ContactsModule,
    CampaignsModule,
    QueueModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

