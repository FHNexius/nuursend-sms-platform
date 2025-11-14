import { IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1600)
  messageTemplate: string;

  @IsUUID()
  @IsNotEmpty()
  senderPhoneNumberId: string;
}

