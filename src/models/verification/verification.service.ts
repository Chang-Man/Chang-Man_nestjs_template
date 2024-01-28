import { Injectable } from '@nestjs/common';
import { VerificationRepository } from './verification.repository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly httpService: HttpService,
  ) {}
  async verify(phone: string) {
    const token = this.httpService.post(``);
    console.log(phone);
  }
}
