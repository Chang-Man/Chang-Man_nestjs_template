import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AligoApiConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        ALIGO_URL: Joi.string(),
        ALIGO_API_KEY: Joi.string(),
        ALIGO_USER_ID: Joi.string(),
        ALIGO_SENDER_KEY: Joi.string(),
        ALIGO_SENDER_PHONE: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, AligoApiConfigService],
  exports: [ConfigService, AligoApiConfigService],
})
export class JwtConfigModule {}
