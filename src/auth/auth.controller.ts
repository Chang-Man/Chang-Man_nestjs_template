import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // signIn(@Body() loginDto: LoginDto) {
  //   return this.authService.signIn(loginDto);
  // }

  @Post('register')
  signup(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }
}
