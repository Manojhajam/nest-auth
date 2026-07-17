import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { VisitorModule } from './visitor/visitor.module';
import { VisitorDocumentModule } from './visitor_documents/visitor_document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    VisitorModule,
    VisitorDocumentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
