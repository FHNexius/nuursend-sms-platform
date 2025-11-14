import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCampaignDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1600)
  messageTemplate?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

