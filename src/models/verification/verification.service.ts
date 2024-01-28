import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { VerificationRepository } from './verification.repository';
import { HttpService } from '@nestjs/axios';
import { AligoApiConfigService } from 'src/config/aligo-api/config.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Verification } from './entity/verification.entity';
import { VERIFICATION_TIME } from './constants/verification.constant';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly aligoApiConfigService: AligoApiConfigService,
    private readonly httpService: HttpService,
  ) {}
  async sendCodeMessage(verification: Verification): Promise<Verification> {
    const verificationHistory = await this.verificationRepository.findBy({
      phone: verification.phone,
    });
    if (verificationHistory.length > 0) {
      for (const pastVarification of verificationHistory) {
        await this.verificationRepository.remove(pastVarification);
      }
    }

    const sendData = new FormData();
    sendData.append('key', this.aligoApiConfigService.aligoApiKey);
    sendData.append('user_id', this.aligoApiConfigService.aligoUser);
    sendData.append('sender', this.aligoApiConfigService.aligoSenderPhone);
    sendData.append('receiver', verification.phone);
    sendData.append(
      'msg',
      `[Aura] 인증 번호 ${verification.code}를 입력해주세요.`,
    );
    sendData.append('testmode_yn', `Y`);

    const { data: sendResponse } = await firstValueFrom(
      this.httpService
        .post(`${this.aligoApiConfigService.aligoUrl}/send/`, sendData)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    // success send message with aligo-api
    if (sendResponse.result_code > 0) {
      return await this.verificationRepository.save(verification);
    } else {
      throw new BadRequestException();
    }
  }

  async verifyCode(verification: Verification): Promise<void> {
    const compareVerification = await this.verificationRepository.findOneBy({
      phone: verification.phone,
    });
    if (!compareVerification)
      throw new BadRequestException(
        '서버 에러: 처음부터 문자 인증을 다시 해주세요.',
      );
    if (compareVerification.code !== verification.code) {
      throw new BadRequestException('인증번호가 다릅니다.');
    }
    const timeDifferenceInMinutes =
      Math.abs(
        compareVerification.createdAt.getTime() -
          verification.createdAt.getTime(),
      ) /
      (1000 * 60);
    if (timeDifferenceInMinutes > VERIFICATION_TIME) {
      await this.verificationRepository.remove(compareVerification);
      throw new BadRequestException('인증 시간을 초과했습니다.');
    }
    compareVerification.verified = true;
    await this.verificationRepository.save(compareVerification);
  }

  async findOneByPhone(phone: string): Promise<Verification> {
    return await this.verificationRepository.findOneBy({ phone });
  }

  async removeCheckedVerification(verification: Verification): Promise<void> {
    await this.verificationRepository.remove(verification);
  }
}
