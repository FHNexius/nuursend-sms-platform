import { IsString, IsOptional, IsEmail, Matches, IsBoolean } from 'class-validator';

export class UpdateContactDto {
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  @IsOptional()
  phoneNumber?: string;

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

