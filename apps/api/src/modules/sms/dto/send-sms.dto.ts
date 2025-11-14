import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  to: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  from: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}

