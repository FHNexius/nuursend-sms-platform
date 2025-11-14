import { IsString, IsNotEmpty, IsArray, Matches } from 'class-validator';

export class SendBulkSmsDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  from: string;

  @IsArray()
  @IsNotEmpty()
  to: string[];

  @IsString()
  @IsNotEmpty()
  body: string;
}

