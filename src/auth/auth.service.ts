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
  async login(): Promise<{ accessToken: string }> {
    return {
      accessToken: '',
    };
  }

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
  async verifyCode(
    verification: Verification,
  ): Promise<{ accessToken: string } | null> {
    const result = await this.verificationService.verifyCode(verification);
    const user = await this.userService.findByPhone(verification.phone);
    if (user) {
      await this.verificationService.removeCheckedVerification(result);
      // 휴대폰으로 시작하기로 휴대폰 인증 후 가입된 유저면 바로 로그인, 유저 정보가 없으면 register로
      const payload: Payload = { id: user.id, phone: user.phone };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
