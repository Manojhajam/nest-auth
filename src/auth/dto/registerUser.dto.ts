import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  fname: string | undefined;

  @IsString()
  @IsNotEmpty()
  lname: string | undefined;

  @IsEmail()
  @IsNotEmpty()
  email: string | undefined;

  @IsString()
  @IsNotEmpty()
  password: string | undefined;
}

export class LoginUserDto {
  @IsEmail()
  email: string | undefined;
  @IsString()
  password: string | undefined;
}
