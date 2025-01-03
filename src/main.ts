import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { AppModule } from '@/app/app.module';
import { AppConfigService } from '@/app/config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Init config service
  const configService = app.get(AppConfigService);
  const appConfig = configService.get('app');

  // Setup global logger
  const logLevels: LogLevel[] = appConfig.logLevel ? appConfig.logLevel.split(',') as LogLevel[] : ['error', 'warn'];
  app.useLogger(logLevels);
  Logger.log('Application started');

  // Enable cors
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger setup
  if (appConfig.nodeEnv === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Alex Spielwelt')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  await app.listen(appConfig.port ?? 3001);
}

bootstrap();
