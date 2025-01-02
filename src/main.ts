import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { AppConfigService } from '@app/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Init config service
  const configService = app.get(AppConfigService);
  const appConfig = configService.get('app');

  await app.listen(appConfig.port ?? 3001);
}

bootstrap();
