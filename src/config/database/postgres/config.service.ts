import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get postgresConfig() {
    return this.configService.get('postgres');
  }
}
