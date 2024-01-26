import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/models/users/entities/user.entity';

export class RegisterRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @Expose()
  @IsBoolean()
  marketing_agree: boolean;

  toEntity(): User {
    return User.signup(this.phone, this.age, this.marketing_agree);
  }
}
