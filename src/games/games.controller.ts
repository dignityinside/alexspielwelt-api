import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { GamesService } from '@/games/games.service';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateGameDto } from '@/games/dto/create-game.dto';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enums/role.enum';
import { Public } from '@/auth/decorators/public.decorator';
import { UpdateGameDto } from '@/games/dto/update-game.dto';

@Controller('games')
@SerializeOptions({ strategy: 'excludeAll' })
export class GamesController {

  constructor(private readonly gamesService: GamesService) {}

  /**
   * Create a new game
   * @param createGameDto
   * @param request
   */
  @Post('admin/add')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action adds a new game' })
  @ApiBearerAuth()
  create(@Body() createGameDto: CreateGameDto, @Request() request) {
    return this.gamesService.create(createGameDto, request.user.sub);
  }

  /**
   * Get all games
   */
  @Get()
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'This action returns all games' })
  findAll() {
    return this.gamesService.findAll();
  }

  /**
   * Get all games without filter for admin page
   */
  @Get('admin')
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'This action returns all games for admin page' })
  @ApiBearerAuth()
  findAllWithoutFilter() {
    return this.gamesService.findAllWithoutFilter();
  }

  /**
   * Get a game by slug
   * @param slug
   */
  @Get(':slug')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'This action returns a game by slug' })
  @ApiParam({ name: 'slug' })
  findOne(@Param('slug') slug: string) {
    return this.gamesService.findOne(slug);
  }

  /**
   * Update a game by slug
   * @param slug
   * @param updateGameDto
   * @param request
   */
  @Patch('admin/:slug')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action updates a game by slug' })
  @ApiParam({ name: 'slug' })
  @ApiBearerAuth()
  update(@Param('slug') slug: string, @Body() updateGameDto: UpdateGameDto, @Request() request) {
    return this.gamesService.update(slug, updateGameDto, request.user.sub);
  }

  /**
   * Get a game by slug for edit mode
   * @param slug
   */
  @Get('admin/edit/:slug')
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'This action returns a game by slug for edit mode' })
  @ApiParam({ name: 'slug' })
  @ApiBearerAuth()
  findOneWithoutFilter(@Param('slug') slug: string) {
    return this.gamesService.findOneWithoutFilter(slug);
  }

  /**
   * Delete game by slug
   * @param slug
   * @param request
   */
  @Delete(':slug')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action removes a game by slug' })
  @ApiParam({ name: 'slug' })
  @ApiBearerAuth()
  remove(@Param('slug') slug: string, @Request() request) {
    return this.gamesService.remove(slug, request.user.sub);
  }
}
