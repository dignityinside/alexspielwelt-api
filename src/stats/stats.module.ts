import { Module } from '@nestjs/common';
import { StatsController } from '@/stats/stats.controller';
import { StatsService } from '@/stats/stats.service';
import { GamesService } from '@/games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { Genre } from '@/genres/entities/genre.entity';
import { GenresService } from '@/genres/genres.service';
import { AppService } from '@/app/app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Genre]),
  ],
  providers: [StatsService, AppService, GamesService, GenresService],
  controllers: [StatsController],
})
export class StatsModule {}
