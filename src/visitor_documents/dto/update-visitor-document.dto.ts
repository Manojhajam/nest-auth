import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitorDocumentDto } from './create-visitor-document.dto';

export class UpdateVisitorDocumentDto extends PartialType(CreateVisitorDocumentDto) {}
