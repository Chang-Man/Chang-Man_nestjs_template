import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './models/user/user.module';
import { UserService } from './models/user/user.service';
import { AuthModule } from './auth/auth.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { VerificationModule } from './models/verification/verification.module';

@Module({
  imports: [
    AppConfigModule,
    UserModule,
    MysqlDatabaseProviderModule,
    AuthModule,
    VerificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
