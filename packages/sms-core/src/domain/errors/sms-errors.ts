/**
 * Base error class for SMS-related errors
 * Follows Error handling best practices
 */
export class SmsError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'SmsError';
    Object.setPrototypeOf(this, SmsError.prototype);
  }
}

/**
 * Error thrown when SMS provider is not available
 */
export class ProviderNotAvailableError extends SmsError {
  constructor(provider: string) {
    super(`SMS provider ${provider} is not available or not configured`, 'PROVIDER_NOT_AVAILABLE');
    this.name = 'ProviderNotAvailableError';
  }
}

/**
 * Error thrown when SMS sending fails
 */
export class SmsSendError extends SmsError {
  constructor(message: string, public readonly provider: string) {
    super(message, 'SMS_SEND_ERROR');
    this.name = 'SmsSendError';
  }
}

/**
 * Error thrown when no provider is available
 */
export class NoProviderAvailableError extends SmsError {
  constructor() {
    super('No SMS provider is available', 'NO_PROVIDER_AVAILABLE');
    this.name = 'NoProviderAvailableError';
  }
}

