import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationRepository } from './verification.repository';
import { HttpModule } from '@nestjs/axios';
import { AligoApiConfigModule } from 'src/config/aligo-api/config.module';

@Module({
  imports: [HttpModule, AligoApiConfigModule],
  providers: [VerificationService, VerificationRepository],
  exports: [VerificationService, VerificationRepository],
})
export class VerificationModule {}
