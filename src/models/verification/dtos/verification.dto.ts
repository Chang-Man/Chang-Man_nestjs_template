import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Verification } from '../entity/verification.entity';

export class VerifyRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

  toEntity(): Verification {
    return Verification.send(this.phone);
  }
}

export class VerifyCodeRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  code: string;

  toEntity(): Verification {
    return Verification.verify(this.phone, this.code);
  }
}
