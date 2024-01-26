import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { ResponseEntity } from 'src/common/res/response-entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // signIn(@Body() loginDto: LoginDto) {
  //   return this.authService.signIn(loginDto);
  // }

  @Post('register')
  async signup(@Body() dto: RegisterRequestDto) {
    try {
      const accessToken = await this.authService.register(dto.toEntity());
      return ResponseEntity.OK_WITH(accessToken);
    } catch (e) {
      return ResponseEntity.ERROR_WITH('회원가입에 실패하였습니다.');
    }
  }
}
