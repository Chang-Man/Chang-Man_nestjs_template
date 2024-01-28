import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationRepository } from './verification.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [VerificationService, VerificationRepository],
  exports: [VerificationService, VerificationRepository],
})
export class VerificationModule {}
