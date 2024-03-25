import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './api/user/user.module';
import { UserService } from './api/user/user.service';
import { AuthModule } from './auth/auth.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';

@Module({
  imports: [
    AppConfigModule,
    UserModule,
    PostgresDatabaseProviderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
