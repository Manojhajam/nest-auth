import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string | undefined;
  @IsString()
  description: string | undefined;
  @IsString()
  level: string | undefined;
  @IsNumber()
  price: number | undefined;
}
