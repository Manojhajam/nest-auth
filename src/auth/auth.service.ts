import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterUserDto) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(registerDto.password, saltRounds);
    return this.userService.createUser({
      ...registerDto,
      password: hashPassword,
    });
  }
}
