import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Courses } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly coursesRepository: typeof Courses,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.create(createCourseDto as Courses);
  }

  async findAll() {
    const data = await this.coursesRepository.findAll();
    return {
      message: 'Courses retrieved successfully',
      data,
    };
  }

  findOne(id: number) {
    return this.coursesRepository.findByPk(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.coursesRepository.update(updateCourseDto, { where: { id } });
  }

  remove(id: number) {
    return this.coursesRepository.destroy({ where: { id } });
  }
}
