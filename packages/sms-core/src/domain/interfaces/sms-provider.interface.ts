import { SendSmsRequest, SendSmsResponse } from '@nuursend/types';

/**
 * Interface for SMS provider implementations
 * Follows Interface Segregation Principle (ISP) from SOLID
 */
export interface ISmsProvider {
  /**
   * Send an SMS message
   * @param request - SMS request containing recipient, message, etc.
   * @returns Promise resolving to SMS response with status and details
   */
  send(request: SendSmsRequest): Promise<SendSmsResponse>;

  /**
   * Get the provider name
   */
  getName(): string;

  /**
   * Check if the provider is available/configured
   */
  isAvailable(): boolean;
}

