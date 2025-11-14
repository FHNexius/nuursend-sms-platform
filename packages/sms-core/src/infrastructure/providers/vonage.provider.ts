import { ISmsProvider } from '../../domain/interfaces';
import { SendSmsRequest, SendSmsResponse, SmsProvider } from '@nuursend/types';
import { ProviderNotAvailableError, SmsSendError } from '../../domain/errors';

/**
 * Vonage (Nexmo) SMS Provider Implementation
 * Follows Single Responsibility Principle (SRP)
 */
export class VonageProvider implements ISmsProvider {
  private client: any;
  private apiKey: string;
  private apiSecret: string;
  private fromNumber: string;

  constructor(config: {
    apiKey: string;
    apiSecret: string;
    fromNumber: string;
  }) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.fromNumber = config.fromNumber;
    this.initializeClient();
  }

  private initializeClient(): void {
    try {
      // Dynamic import to avoid requiring vonage as a hard dependency
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Vonage = require('@vonage/server-sdk');
      this.client = new Vonage({
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
      });
    } catch (error) {
      // Vonage not installed
      this.client = null;
    }
  }

  getName(): string {
    return 'vonage';
  }

  isAvailable(): boolean {
    return this.client !== null && !!this.apiKey && !!this.apiSecret;
  }

  async send(request: SendSmsRequest): Promise<SendSmsResponse> {
    if (!this.isAvailable()) {
      throw new ProviderNotAvailableError('vonage');
    }

    try {
      return new Promise((resolve, reject) => {
        this.client.sms.send(
          {
            to: request.to,
            from: request.from || this.fromNumber,
            text: request.message,
          },
          (error: any, responseData: any) => {
            if (error) {
              reject(
                new SmsSendError(
                  error.message || 'Failed to send SMS via Vonage',
                  'vonage'
                )
              );
            } else {
              const message = responseData.messages[0];
              resolve({
                id: message['message-id'] || `vonage-${Date.now()}`,
                status: message.status === '0' ? 'sent' : 'failed',
                provider: 'vonage' as SmsProvider,
                to: request.to,
                from: request.from || this.fromNumber,
                message: request.message,
                error: message.status !== '0' ? message['error-text'] : undefined,
                timestamp: new Date(),
              });
            }
          }
        );
      });
    } catch (error: any) {
      throw new SmsSendError(
        error.message || 'Failed to send SMS via Vonage',
        'vonage'
      );
    }
  }
}

