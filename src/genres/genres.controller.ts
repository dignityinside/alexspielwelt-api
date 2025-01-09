import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { GenresService } from '@/genres/genres.service';
import { CreateGenreDto } from '@/genres/dto/create-genre.dto';
import { UpdateGenreDto } from '@/genres/dto/update-genre.dto';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enums/role.enum';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('games/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post('admin/add')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action adds a new genre' })
  @ApiBearerAuth()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get('all')
  @Public()
  @ApiOperation({ summary: 'This action returns all genres' })
  findAll() {
    return this.genresService.findAll();
  }

  @Patch('admin/:slug')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action updates a genre by slug' })
  @ApiParam({ name: 'slug' })
  @ApiBearerAuth()
  update(@Param('slug') slug: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(slug, updateGenreDto);
  }

  @Delete('admin/:slug')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This action removes a genre by slug' })
  @ApiParam({ name: 'slug' })
  @ApiBearerAuth()
  remove(@Param('slug') slug: string) {
    return this.genresService.remove(slug);
  }
}
