import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Module({
  providers: [VerificationService],
  controllers: [],
})
export class VerificationModule {}
