import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  @Get('/profile')
  getProfile(@Req() req) {
    console.log(req.user);
  }
}
