import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { VerificationRepository } from './verification.repository';
import { HttpService } from '@nestjs/axios';
import { AligoApiConfigService } from 'src/config/aligo-api/config.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Verification } from './entity/verification.entity';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly aligoApiConfigService: AligoApiConfigService,
    private readonly httpService: HttpService,
  ) {}
  async verify(verification: Verification) {
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
      await this.verificationRepository.save(verification);
    } else {
      throw new BadRequestException();
    }
  }
}
