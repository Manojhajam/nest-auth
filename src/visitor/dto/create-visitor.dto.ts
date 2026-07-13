import { IsString } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  full_name: string | undefined;

  @IsString()
  address: string | undefined;

  @IsString()
  phone: string | undefined;

  @IsString()
  citizenship_no: string | undefined;

  @IsString()
  purpose_of_visit: string | undefined;
}
