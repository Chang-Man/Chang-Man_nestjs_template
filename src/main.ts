import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { ValidationPipe } from '@nestjs/common';
import { setNestApp } from './common/base/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);
  setNestApp(app);
  await app.listen(appConfig.port);
}
bootstrap();
