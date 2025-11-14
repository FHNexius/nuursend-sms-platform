import { z } from 'zod';

export const SmsProviderSchema = z.enum(['twilio', 'vonage', 'telnyx']);

export type SmsProvider = z.infer<typeof SmsProviderSchema>;

export const SendSmsRequestSchema = z.object({
  to: z.string().min(1),
  message: z.string().min(1).max(1600),
  from: z.string().optional(),
  provider: SmsProviderSchema.optional(),
});

export type SendSmsRequest = z.infer<typeof SendSmsRequestSchema>;

export const SendSmsResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['sent', 'failed', 'pending']),
  provider: SmsProviderSchema,
  to: z.string(),
  from: z.string().optional(),
  message: z.string(),
  error: z.string().optional(),
  timestamp: z.date(),
});

export type SendSmsResponse = z.infer<typeof SendSmsResponseSchema>;

export const SmsStatusSchema = z.enum(['sent', 'delivered', 'failed', 'pending']);

export type SmsStatus = z.infer<typeof SmsStatusSchema>;

