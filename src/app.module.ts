import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { UsersModule } from './api/user/user.module';
import { UserService } from './api/user/user.service';
import { AuthModule } from './auth/auth.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    MysqlDatabaseProviderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
