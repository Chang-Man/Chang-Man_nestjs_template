import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/common/entity/response/response.entity';
import { User } from 'src/model/user/user.entity';
import { ApiOkResponseObject } from 'src/common/decorators/swagger/api-response.decorator';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponseObject(LoginResponseDto)
  async signIn(@Body() dto: LoginDto) {
    try {
      const accessToken = await this.authService.signIn(dto);
      return ResponseEntity.OK_WITH(accessToken);
    } catch (e) {
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '유저 생성' })
  @ApiOkResponseObject(User)
  async signup(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto.toEntity());
      return ResponseEntity.OK_WITH(user);
    } catch (e) {
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }
}
