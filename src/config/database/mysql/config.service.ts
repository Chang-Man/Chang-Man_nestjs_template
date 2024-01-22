import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('mysql.name');
  }
  get username(): string {
    return this.configService.get<string>('mysql.username');
  }
  get password(): string {
    return this.configService.get<string>('mysql.password');
  }
  get host(): string {
    return this.configService.get<string>('mysql.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('mysql.port'));
  }
}
