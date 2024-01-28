import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [JwtConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
