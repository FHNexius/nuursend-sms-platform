import { ISmsProvider } from '../../domain/interfaces';
import { SendSmsRequest, SendSmsResponse, SmsProvider } from '@nuursend/types';
import { ProviderNotAvailableError, SmsSendError } from '../../domain/errors';

/**
 * Twilio SMS Provider Implementation
 * Follows Single Responsibility Principle (SRP)
 */
export class TwilioProvider implements ISmsProvider {
  private client: any;
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor(config: {
    accountSid: string;
    authToken: string;
    fromNumber: string;
  }) {
    this.accountSid = config.accountSid;
    this.authToken = config.authToken;
    this.fromNumber = config.fromNumber;
    this.initializeClient();
  }

  private initializeClient(): void {
    try {
      // Dynamic import to avoid requiring twilio as a hard dependency
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const twilio = require('twilio');
      this.client = twilio(this.accountSid, this.authToken);
    } catch (error) {
      // Twilio not installed
      this.client = null;
    }
  }

  getName(): string {
    return 'twilio';
  }

  isAvailable(): boolean {
    return this.client !== null && !!this.accountSid && !!this.authToken;
  }

  async send(request: SendSmsRequest): Promise<SendSmsResponse> {
    if (!this.isAvailable()) {
      throw new ProviderNotAvailableError('twilio');
    }

    try {
      const message = await this.client.messages.create({
        body: request.message,
        to: request.to,
        from: request.from || this.fromNumber,
      });

      return {
        id: message.sid,
        status: 'sent',
        provider: 'twilio' as SmsProvider,
        to: request.to,
        from: request.from || this.fromNumber,
        message: request.message,
        timestamp: new Date(),
      };
    } catch (error: any) {
      throw new SmsSendError(
        error.message || 'Failed to send SMS via Twilio',
        'twilio'
      );
    }
  }
}

