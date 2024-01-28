import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Verification } from '../entity/verification.entity';

export class VerifyRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

  toEntity(): Verification {
    return Verification.verify(this.phone);
  }
}

export class VerificationDto {
  @Expose()
  @IsString()
  phone: string;
}
