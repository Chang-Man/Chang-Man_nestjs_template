import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationRepository } from './verification.repository';

@Module({
  providers: [VerificationService, VerificationRepository],
  exports: [VerificationService, VerificationRepository],
})
export class VerificationModule {}
