import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { visitorsProvider } from './visitor.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VisitorController],
  providers: [VisitorService, ...visitorsProvider],
})
export class VisitorModule {}
