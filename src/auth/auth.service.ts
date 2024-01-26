import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { RegisterRequestDto } from './dto/register.dto';
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
  async register(registerDto: RegisterRequestDto) {
    const userFind = await this.userService.findOne(registerDto.phone);
  }

  async signIn() {
    // const { email, password } = loginDto;
    // const user = await this.userService.findOne(email);
    // const validatePassword = await compare(loginDto.password, user.password);
    // if (!user || !validatePassword) throw new UnauthorizedException();
    // const payload: Payload = { id: user.id, email: user.email };
    // return {
    //   accessToken: this.jwtService.sign(payload),
    // };
  }
}
