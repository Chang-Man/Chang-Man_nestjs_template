import { IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  email: string;
  @MaxLength(20, { message: 'Max Length is 20' })
  @IsString({ message: 'it is not string' })
  name: string;
  @MaxLength(60, { message: 'Max Length is 60' })
  @IsString({ message: 'it is not string' })
  password: string;
}
