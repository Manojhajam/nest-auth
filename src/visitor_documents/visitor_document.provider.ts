import { VisitorDocument } from './entities/visitor_document.entity';

export const visitorDocumentsProvider = [
  {
    provide: 'VISITOR_DOCUMENTS_REPOSITORY',
    useValue: VisitorDocument,
  },
];
