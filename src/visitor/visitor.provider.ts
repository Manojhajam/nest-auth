import { Visitors } from './entities/visitor.entity';

export const visitorsProvider = [
  {
    provide: 'VISITORS_REPOSITORY',
    useValue: Visitors,
  },
];
