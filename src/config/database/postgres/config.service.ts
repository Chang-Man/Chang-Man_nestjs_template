import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('postgres.name');
  }
  get username(): string {
    return this.configService.get<string>('postgres.username');
  }
  get password(): string {
    return this.configService.get<string>('postgres.password');
  }
  get host(): string {
    return this.configService.get<string>('postgres.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('postgres.port'));
  }
}
