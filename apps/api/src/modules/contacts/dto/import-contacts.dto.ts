import { IsString, IsNotEmpty } from 'class-validator';

export class ImportContactsDto {
  @IsString()
  @IsNotEmpty()
  csvData: string; // Base64 encoded CSV or CSV string
}

