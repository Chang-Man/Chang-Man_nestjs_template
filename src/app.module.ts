import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { UsersModule } from './models/users/users.module';
import { UsersService } from './models/users/users.service';
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
  providers: [UsersService],
})
export class AppModule {}
