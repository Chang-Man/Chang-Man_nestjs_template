import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { ResponseEntity } from 'src/common/res/response-entity';
import {
  VerifyCodeRequestDto,
  VerifyRequestDto,
} from 'src/models/verification/dtos/verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Body() dto: RegisterRequestDto) {
    try {
      const accessToken = await this.authService.register(dto.toEntity());
      return ResponseEntity.OK_WITH(accessToken);
    } catch (e) {
      return ResponseEntity.ERROR_WITH('회원가입에 실패하였습니다.');
    }
  }

  @Post('verify/send')
  @HttpCode(200)
  async phoneVerification(@Body() dto: VerifyRequestDto) {
    try {
      await this.authService.sendCode(dto.toEntity());
      return ResponseEntity.OK();
    } catch (e) {
      return ResponseEntity.ERROR();
    }
  }

  @Post('verify/code')
  @HttpCode(200)
  async codeVerification(@Body() dto: VerifyCodeRequestDto) {
    try {
      const accessToken = await this.authService.verifyCode(dto.toEntity());
      if (accessToken) {
        return ResponseEntity.OK_WITH(accessToken);
      } else {
        return ResponseEntity.OK_WITH('register');
      }
    } catch (e) {
      return ResponseEntity.ERROR_WITH(e.response.message);
    }
  }
}
