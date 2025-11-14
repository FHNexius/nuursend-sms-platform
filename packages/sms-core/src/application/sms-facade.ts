import { SmsService } from '../infrastructure/sms-service';
import { TwilioProvider } from '../infrastructure/providers/twilio.provider';
import { VonageProvider } from '../infrastructure/providers/vonage.provider';
import { TelnyxProvider } from '../infrastructure/providers/telnyx.provider';
import { SendSmsRequest, SendSmsResponse } from '@nuursend/types';

/**
 * SMS Facade
 * Provides a simple interface for SMS operations
 * Follows Facade Pattern - simplifies complex subsystem
 */
export class SmsFacade {
  private smsService: SmsService;

  constructor(config?: {
    twilio?: { accountSid: string; authToken: string; fromNumber: string };
    vonage?: { apiKey: string; apiSecret: string; fromNumber: string };
    telnyx?: { apiKey: string; fromNumber: string };
  }) {
    this.smsService = new SmsService();

    // Register providers if configured
    if (config?.twilio) {
      this.smsService.registerProvider(
        new TwilioProvider(config.twilio)
      );
    }

    if (config?.vonage) {
      this.smsService.registerProvider(
        new VonageProvider(config.vonage)
      );
    }

    if (config?.telnyx) {
      this.smsService.registerProvider(
        new TelnyxProvider(config.telnyx)
      );
    }
  }

  /**
   * Send SMS message
   */
  async send(request: SendSmsRequest): Promise<SendSmsResponse> {
    return this.smsService.send(request);
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    return this.smsService.getAvailableProviders();
  }
}

