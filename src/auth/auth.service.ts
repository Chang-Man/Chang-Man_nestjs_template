import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { User } from 'src/models/user/entity/user.entity';
import { Payload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Verification } from 'src/models/verification/entity/verification.entity';
import { VerificationService } from 'src/models/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private verificationService: VerificationService,
    private jwtService: JwtService,
  ) {}
  async register(user: User): Promise<{ accessToken: string }> {
    const userFind = await this.userService.findByPhone(user.phone);
    const verification = await this.verificationService.findOneByPhone(
      user.phone,
    );

    if (userFind) throw new BadRequestException('already exist user');
    if (!verification || !verification.verified)
      throw new BadRequestException(
        '인증되지 않은 번호 입니다. 문자 인증을 처음부터 진행해주세요.',
      );

    await this.verificationService.removeCheckedVerification(verification);
    await this.userService.create(user);
    const payload: Payload = { id: user.id, phone: user.phone };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyPhone(verification: Verification): Promise<Verification> {
    const createdVerification =
      await this.verificationService.sendCodeMessage(verification);
    return createdVerification;
  }
  async verifyCode(verification: Verification): Promise<void> {
    await this.verificationService.verifyCode(verification);
  }
}
