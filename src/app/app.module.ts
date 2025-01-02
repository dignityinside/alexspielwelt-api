import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { AppConfigService } from '@/app/config/config.service';
import { appConfig } from '@/app/config/app.config';
import { databaseConfig } from '@/app/config/database.config';

@Module({
  imports: [
    // Register global config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    // Connect to database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        // List of entities
        entities: [],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})

export class AppModule {}
