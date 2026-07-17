import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVisitorDocumentDto {
  @IsNumber()
  visitor_id: number | undefined;

  @IsEnum(['CITIZENSHIP', 'DRIVING_LICENSE', 'PASSPORT', 'OTHER'])
  document_type: string | undefined;

  @IsString()
  document_number: string | undefined;

  @IsOptional()
  @IsString()
  file_path?: string;
}
