import { Module } from '@nestjs/common';
import { VisitorDocumentController } from './visitor_document.controller';
import { VisitorDocumentService } from './visitor_document.service';
import { visitorDocumentsProvider } from './visitor_document.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VisitorDocumentController],
  providers: [VisitorDocumentService, ...visitorDocumentsProvider],
})
export class VisitorDocumentModule {}
