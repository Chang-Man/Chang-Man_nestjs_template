import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { User } from 'src/models/users/entities/user.entity';
import { Payload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(user: User): Promise<{ accessToken: string }> {
    const userFind = await this.userService.findByPhone(user.phone);
    if (userFind) throw new BadRequestException('already exist user');
    await this.userService.create(user);
    const payload: Payload = { id: user.id, phone: user.phone };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
