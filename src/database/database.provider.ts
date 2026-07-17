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
import { Visitors } from 'src/visitor/entities/visitor.entity';
import { VisitorDocument } from 'src/visitor_documents/entities/visitor_document.entity';

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

      sequelize.addModels([Users, Visitors, VisitorDocument]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
