// Queue module interfaces
// Implementation by Codex

export interface SmsJobData {
  messageId: string;
  provider: string;
  from: string;
  to: string;
  body: string;
}

export interface CampaignJobData {
  campaignId: string;
  userId: string;
}

