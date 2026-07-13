import { Users } from './entities/user.entity';

export const userProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
