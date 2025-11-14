import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TwilioProvider } from './twilio.provider';
import { ProviderNotAvailableError } from '../../domain/errors';

describe('TwilioProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when Twilio is not installed', () => {
    it('should indicate provider is not available', () => {
      const provider = new TwilioProvider({
        accountSid: 'test',
        authToken: 'test',
        fromNumber: '+1234567890',
      });

      expect(provider.isAvailable()).toBe(false);
    });

    it('should throw error when trying to send', async () => {
      const provider = new TwilioProvider({
        accountSid: 'test',
        authToken: 'test',
        fromNumber: '+1234567890',
      });

      await expect(
        provider.send({
          to: '+1234567890',
          message: 'Test message',
        })
      ).rejects.toThrow(ProviderNotAvailableError);
    });
  });

  it('should return correct provider name', () => {
    const provider = new TwilioProvider({
      accountSid: 'test',
      authToken: 'test',
      fromNumber: '+1234567890',
    });

    expect(provider.getName()).toBe('twilio');
  });
});

