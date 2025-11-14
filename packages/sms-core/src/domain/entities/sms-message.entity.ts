import { SendSmsRequest, SendSmsResponse, SmsProvider } from '@nuursend/types';

/**
 * SMS Message Entity
 * Represents the domain model for an SMS message
 * Follows Domain-Driven Design principles
 */
export class SmsMessage {
  constructor(
    public readonly id: string,
    public readonly to: string,
    public readonly message: string,
    public readonly from?: string,
    public readonly provider?: SmsProvider,
    public readonly status?: 'sent' | 'failed' | 'pending',
    public readonly error?: string,
    public readonly timestamp?: Date
  ) {}

  /**
   * Create from request
   */
  static fromRequest(request: SendSmsRequest, id: string): SmsMessage {
    return new SmsMessage(
      id,
      request.to,
      request.message,
      request.from,
      request.provider,
      'pending'
    );
  }

  /**
   * Create from response
   */
  static fromResponse(response: SendSmsResponse): SmsMessage {
    return new SmsMessage(
      response.id,
      response.to,
      response.message,
      response.from,
      response.provider,
      response.status,
      response.error,
      response.timestamp
    );
  }

  /**
   * Mark as sent
   */
  markAsSent(provider: SmsProvider, from?: string): SmsMessage {
    return new SmsMessage(
      this.id,
      this.to,
      this.message,
      from || this.from,
      provider,
      'sent',
      undefined,
      new Date()
    );
  }

  /**
   * Mark as failed
   */
  markAsFailed(error: string): SmsMessage {
    return new SmsMessage(
      this.id,
      this.to,
      this.message,
      this.from,
      this.provider,
      'failed',
      error,
      new Date()
    );
  }
}

