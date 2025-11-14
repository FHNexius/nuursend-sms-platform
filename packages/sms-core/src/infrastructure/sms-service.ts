import { ISmsProvider } from '../domain/interfaces';
import { SendSmsRequest, SendSmsResponse, SmsProvider } from '@nuursend/types';
import { NoProviderAvailableError, ProviderNotAvailableError } from '../domain/errors';

/**
 * SMS Service
 * Orchestrates SMS sending across multiple providers
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions
 */
export class SmsService {
  private providers: Map<SmsProvider, ISmsProvider> = new Map();

  /**
   * Register a provider
   */
  registerProvider(provider: ISmsProvider): void {
    this.providers.set(provider.getName() as SmsProvider, provider);
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): SmsProvider[] {
    return Array.from(this.providers.values())
      .filter((p) => p.isAvailable())
      .map((p) => p.getName() as SmsProvider);
  }

  /**
   * Send SMS using a specific provider or auto-select
   */
  async send(request: SendSmsRequest): Promise<SendSmsResponse> {
    const requestedProvider = request.provider;

    if (requestedProvider) {
      // Use requested provider
      const provider = this.providers.get(requestedProvider);
      if (!provider || !provider.isAvailable()) {
        throw new ProviderNotAvailableError(requestedProvider);
      }
      return provider.send(request);
    }

    // Auto-select first available provider
    const availableProviders = this.getAvailableProviders();
    if (availableProviders.length === 0) {
      throw new NoProviderAvailableError();
    }

    // Try providers in order until one succeeds
    let lastError: Error | null = null;
    for (const providerName of availableProviders) {
      try {
        const provider = this.providers.get(providerName);
        if (provider) {
          return await provider.send(request);
        }
      } catch (error) {
        lastError = error as Error;
        // Continue to next provider
      }
    }

    // If all providers failed, throw the last error
    throw lastError || new NoProviderAvailableError();
  }
}

