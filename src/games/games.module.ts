import { Module } from '@nestjs/common';
import { GamesController } from '@/games/games.controller';
import { GamesService } from '@/games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { AppService } from '@/app/app.service';
import { Genre } from '@/genres/entities/genre.entity';
import { GenresService } from '@/genres/genres.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Genre]),
  ],
  controllers: [GamesController],
  providers: [GamesService, GenresService, AppService],
})

export class GamesModule {}
