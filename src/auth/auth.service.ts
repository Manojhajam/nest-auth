import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto, RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof Users,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(registerDto.password, saltRounds);
    return this.userService.createUser({
      ...registerDto,
      password: hashPassword,
    });
  }

  async login(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password1');
      }

      const userJson = user.toJSON();

      const isPasswordMatched = await bcrypt.compare(
        password,
        userJson.password,
      );

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password2');
      }

      const payload = {
        id: userJson.id,
        email: userJson.email,
      };

      const access_token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        access_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password3');
      console.log('Error during login:', error);
    }
  }
}
