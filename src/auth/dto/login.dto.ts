import { IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not email' })
  email: string;
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not email' })
  password: string;
}
