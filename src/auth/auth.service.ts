import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/models/users/entities/user.entity';
import { getHash } from 'src/common/utils/hash';
import { Payload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const userFind = await this.userService.findOne(registerDto.email);
    if (userFind) {
      throw new BadRequestException('Already registered email');
    }
    registerDto.password = await getHash(registerDto.password);
    const newUser = await this.userService.create(
      new User(registerDto.email, registerDto.password, registerDto.name),
    );
    return { email: newUser.email };
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);
    const validatePassword = await compare(loginDto.password, user.password);
    if (!user || !validatePassword) throw new UnauthorizedException();

    const payload: Payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
