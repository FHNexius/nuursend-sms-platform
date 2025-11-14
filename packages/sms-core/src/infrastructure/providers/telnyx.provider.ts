import { ISmsProvider } from '../../domain/interfaces';
import { SendSmsRequest, SendSmsResponse, SmsProvider } from '@nuursend/types';
import { ProviderNotAvailableError, SmsSendError } from '../../domain/errors';

/**
 * Telnyx SMS Provider Implementation
 * Follows Single Responsibility Principle (SRP)
 */
export class TelnyxProvider implements ISmsProvider {
  private client: any;
  private apiKey: string;
  private fromNumber: string;

  constructor(config: { apiKey: string; fromNumber: string }) {
    this.apiKey = config.apiKey;
    this.fromNumber = config.fromNumber;
    this.initializeClient();
  }

  private initializeClient(): void {
    try {
      // Dynamic import to avoid requiring telnyx as a hard dependency
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Telnyx = require('@telnyx/telnyx');
      this.client = new Telnyx(this.apiKey);
    } catch (error) {
      // Telnyx not installed
      this.client = null;
    }
  }

  getName(): string {
    return 'telnyx';
  }

  isAvailable(): boolean {
    return this.client !== null && !!this.apiKey;
  }

  async send(request: SendSmsRequest): Promise<SendSmsResponse> {
    if (!this.isAvailable()) {
      throw new ProviderNotAvailableError('telnyx');
    }

    try {
      const message = await this.client.messages.create({
        to: request.to,
        from: request.from || this.fromNumber,
        text: request.message,
      });

      return {
        id: message.data.id || `telnyx-${Date.now()}`,
        status: message.data.status === 'queued' ? 'sent' : 'pending',
        provider: 'telnyx' as SmsProvider,
        to: request.to,
        from: request.from || this.fromNumber,
        message: request.message,
        timestamp: new Date(),
      };
    } catch (error: any) {
      throw new SmsSendError(
        error.message || 'Failed to send SMS via Telnyx',
        'telnyx'
      );
    }
  }
}

