import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { User } from 'src/api/user/entity/user.entity';
import { getHash } from 'src/common/utils/hash';

export class RegisterDto {
  @Expose()
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  email: string;

  @Expose()
  @MaxLength(20, { message: 'Max Length is 20' })
  @IsString({ message: 'it is not string' })
  name: string;

  @Expose()
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  password: string;

  toEntity(): User {
    return User.signup(this.name, this.email, this.password);
  }
}
