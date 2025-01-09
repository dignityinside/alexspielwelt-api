import { Controller, Get } from '@nestjs/common';
import { Public } from '@/auth/decorators/public.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { GamesService } from '@/games/games.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'This action returns amount of all games' })
  async countGames() {
    return {
      own: 16,
      addons: 1,
      hours: 1000,
      games: await this.gamesService.countGames()
    };
  }
}
