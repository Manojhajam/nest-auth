import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { coursesProvider } from './courses.provider';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesProvider],
})
export class CoursesModule {}
