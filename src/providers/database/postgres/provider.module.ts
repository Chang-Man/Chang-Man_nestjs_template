import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../../config/database/postgres/config.module';
import { User } from 'src/model/user/user.entity';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule, AppConfigModule],
      useFactory: async (
        postgresConfigService: PostgresConfigService,
        appConfigService: AppConfigService,
      ) => postgresConfigService.postgresConfig,
      inject: [PostgresConfigService, AppConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
