import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  async verify(phone: string) {
    console.log(phone);
  }
}
