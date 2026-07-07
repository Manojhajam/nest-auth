import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly userRepository: typeof Users,
  ) {}

  async createUser(registerDto: RegisterUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.userRepository.create({
      ...registerDto,
      password: registerDto.password
    } as unknown as Users);

    return {message: 'User registered successfully', user: newUser};
  }
}
