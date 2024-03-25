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
      ) => ({
        type: 'postgres' as DatabaseType,
        timezone: '+09:00',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.name,
        entities: [User],
        migrations: ['dist/config/database/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        // synchronize: appConfigService.env === 'development' ? true : false,
        synchronize: true,
      }),
      inject: [PostgresConfigService, AppConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
