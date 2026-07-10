import { Courses } from "./entities/course.entity";

export const coursesProvider = [
  {
    provide: 'COURSES_REPOSITORY',
    useValue: Courses,
  },
];