import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { AppConfigService } from '@/app/config/config.service';
import { appConfig } from '@/app/config/app.config';
import { databaseConfig } from '@/app/config/database.config';
import { AuthModule } from '@/auth/auth.module';
import { User } from '@/users/entities/user.entity';
import { Game } from '@/games/entities/game.entity';
import { GamesModule } from '@/games/games.module';
import { Genre } from '@/genres/entities/genre.entity';
import { GenresModule } from '@/genres/genres.module';
import { StatsModule } from '@/stats/stats.module';

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
        entities: [User, Game, Genre],
      }),
    }),
    AuthModule,
    GamesModule,
    GenresModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})

export class AppModule {}
