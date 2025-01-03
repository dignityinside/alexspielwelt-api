import { Module } from '@nestjs/common';
import { GamesController } from '@/games/games.controller';
import { GamesService } from '@/games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { AppService } from '@/app/app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GamesController],
  providers: [GamesService, AppService],
})

export class GamesModule {}
