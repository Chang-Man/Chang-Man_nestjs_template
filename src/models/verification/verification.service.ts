import { Injectable } from '@nestjs/common';
import { VerificationRepository } from './verification.repository';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
  ) {}
  async verify(phone: string) {
    console.log(phone);
  }
}
