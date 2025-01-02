import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { AppConfigService } from '@app/config/config.service';
import { appConfig } from '@app/config/app.config';
import { databaseConfig } from '@app/config/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, databaseConfig],
  })],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
