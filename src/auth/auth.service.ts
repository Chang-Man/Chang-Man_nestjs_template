import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { User } from 'src/models/user/entity/user.entity';
import { Payload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Verification } from 'src/models/verification/entity/verification.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private verificationService: UserService,
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

  async verifyPhone(verification: Verification): Promise<{ code: string }> {
    // const userFind = await this.userService.findByPhone(user.phone);
    // if (userFind) throw new BadRequestException('already exist user');
    // await this.userService.create(user);
    // const payload: Payload = { id: user.id, phone: user.phone };
    return { code: verification.code };
  }
}
