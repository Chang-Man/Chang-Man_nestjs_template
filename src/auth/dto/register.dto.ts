import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString({ message: 'it is not string' })
  phone: string;
  @IsNumber()
  age: number;
  @IsBoolean()
  marketing_agree: boolean;
}
