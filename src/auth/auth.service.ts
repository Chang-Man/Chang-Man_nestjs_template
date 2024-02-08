import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/api/user/entity/user.entity';
import { Payload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(user: User): Promise<User> {
    const userFind = await this.userService.findOneByEmail(user.email);
    if (userFind) {
      throw new BadRequestException('Already registered email');
    }
    userFind.updateHashedPassword();
    return user;
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);
    const validatePassword = await compare(loginDto.password, user.password);
    if (!user || !validatePassword) throw new UnauthorizedException();

    const payload: Payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
