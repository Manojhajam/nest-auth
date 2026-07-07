import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    fname: string | undefined ;
    @IsString()
    lname: string | undefined ;
    @IsEmail()
    email: string | undefined ;
    @IsString()
    password: string | undefined ;
}