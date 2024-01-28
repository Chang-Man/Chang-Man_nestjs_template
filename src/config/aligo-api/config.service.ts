import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AligoApiConfigService {
  constructor(private configService: ConfigService) {}

  get aligoUrl(): string {
    return this.configService.get<string>('aligoapi.aligoUrl');
  }
  get aligoApiKey(): string {
    return this.configService.get<string>('aligoapi.aligoApiKey');
  }
  get aligoUser(): string {
    return this.configService.get<string>('aligoapi.aligoUser');
  }
  get aligoSenderKey(): string {
    return this.configService.get<string>('aligoapi.aligoSenderKey');
  }
  get aligoSenderPhone(): string {
    return this.configService.get<string>('aligoapi.aligoSenderPhone');
  }
}
