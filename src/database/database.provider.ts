// SequelizeModule.forRoot({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   autoLoadModels: true,
//   synchronize: true,
// }),

import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/user/entities/user.entity';
import { Courses } from 'src/courses/entities/course.entity';
import { Visitors } from 'src/visitor/entities/visitor.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        dialectOptions: {
          ssl: process.env.DB_SSL === 'true',
          native: true,
        },
      });

      sequelize.addModels([Users, Courses, Visitors]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
