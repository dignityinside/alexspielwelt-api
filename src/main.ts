import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { AppModule } from '@/app/app.module';
import { AppConfigService } from '@/app/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Init config service
  const configService = app.get(AppConfigService);
  const appConfig = configService.get('app');

  // Setup global logger
  const logLevels: LogLevel[] = appConfig.logLevel ? appConfig.logLevel.split(',') as LogLevel[] : ['error', 'warn'];
  app.useLogger(logLevels);
  Logger.log('Application started');

  await app.listen(appConfig.port ?? 3001);
}

bootstrap();
