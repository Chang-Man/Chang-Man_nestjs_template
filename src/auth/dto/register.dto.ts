import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { User } from 'src/model/user/user.entity';
import { getHash } from 'src/common/utils/hash';

export class RegisterDto {
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '이름' })
  @MaxLength(20, { message: 'Max Length is 20' })
  @IsString({ message: 'it is not string' })
  name: string;

  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  @ApiProperty({ description: '비밀번호' })
  password: string;

  toEntity(): User {
    return User.signup(this.name, this.email, this.password);
  }
}
