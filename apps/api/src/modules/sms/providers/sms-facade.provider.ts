import { Provider } from '@nestjs/common';
import { SmsFacade } from '@nuursend/sms-core';

export const SMS_FACADE_PROVIDER = 'SMS_FACADE';

export const smsFacadeProvider: Provider = {
  provide: SMS_FACADE_PROVIDER,
  useFactory: () => {
    // Initialize SmsFacade with provider configurations
    // Implementation by Codex
    return new SmsFacade({
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        fromNumber: process.env.TWILIO_FROM_NUMBER,
      },
      vonage: {
        apiKey: process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET,
        fromNumber: process.env.VONAGE_FROM_NUMBER,
      },
      telnyx: {
        apiKey: process.env.TELNYX_API_KEY,
        fromNumber: process.env.TELNYX_FROM_NUMBER,
      },
    });
  },
};

