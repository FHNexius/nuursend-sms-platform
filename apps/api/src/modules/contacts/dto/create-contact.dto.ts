import { IsString, IsOptional, IsEmail, Matches, IsBoolean } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  optedIn?: boolean;
}

