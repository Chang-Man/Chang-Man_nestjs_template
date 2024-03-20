import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/model/user/user.entity';
import { Payload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { getHash } from 'src/common/utils/hash';
import { LoginResponseDto } from './dto/login-response.dto';

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
    const password = await getHash(user.password);
    user.password = password;
    await this.userService.create(user);
    return user;
  }

  async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);
    const validatePassword = await compare(loginDto.password, user.password);
    if (!user || !validatePassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    const payload: Payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
