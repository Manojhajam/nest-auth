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
  async create(createCourseDto: CreateCourseDto) {
    const data = await this.coursesRepository.create(createCourseDto as Courses);
    return { message: 'Course created successfully',
      data: data };
  }

   findAll() {
    const data = this.coursesRepository.findAll();
    return data;
  }

  findOne(id: number) {
    const data = this.coursesRepository.findByPk(id);
    return data;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const data = await this.coursesRepository.update(updateCourseDto, { where: { id } });
    return {
      message: 'Course updated successfully',
      data: await this.findOne(id),
    };
  }

  async remove(id: number) {
    const data = await this.coursesRepository.destroy({ where: { id } });
    return {
      message: 'Course deleted successfully'
    };
  }
}
