import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  priceId: string; // Stripe price ID
}

