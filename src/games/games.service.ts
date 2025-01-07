import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AppService } from '@/app/app.service';
import { CreateGameDto } from '@/games/dto/create-game.dto';
import { Status } from '@/games/enums/status.enum';
import { UpdateGameDto } from '@/games/dto/update-game.dto';
import { Genre } from '@/genres/entities/genre.entity';

@Injectable()
export class GamesService {
  private _adminId: 1;

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly appService: AppService
  ) {}

  /**
   * This action adds a new game
   * @param createGameDto
   * @param userId
   */
  async create(createGameDto: CreateGameDto, userId: number): Promise<Game> {
    const { slug, title } = createGameDto;

    const currentSlug = await this.generateSlug(slug, title);

    const genres = await this.genreRepository.findByIds(createGameDto.genres);

    const game = {
      ...createGameDto,
      slug: currentSlug,
      userId: userId,
      genres: genres,
    };

    return this.gameRepository.save(game);
  }

  /**
   * This action returns all games filtered by status and userId
   */
  async findAll() {
    const games = await this.gameRepository.find({
      select: [
        'title',
        'slug',
        'img',
        'rating',
        'ean',
        'publisher',
        'difficulty',
        'recommendedAge',
        'players',
        'playTime'
      ],
      where: {
        status: Status.PUBLIC,
        userId: this._adminId
      },
      relations: ['user', 'genres'],
      order: { createdAt: 'DESC' }
    });

    if (!games || games.length === 0) {
      throw new NotFoundException('No games found.');
    }

    return games;
  }

  /**
   * This action returns all games without filter
   */
  async findAllWithoutFilter() {
    const games = await this.gameRepository.find({
      select: ['id', 'title', 'slug', 'createdAt', 'status'],
      order: { createdAt: 'DESC' }
    });

    if (!games || games.length === 0) {
      throw new NotFoundException('No games found.');
    }

    return games;
  }

  /**
   * This action returns a game by slug, filtered by status and userId
   * @param slug
   */
  async findOne(slug: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: {
        status: Status.PUBLIC,
        userId: this._adminId,
        slug: slug
      },
      relations: ['user', 'genres'],
    });

    if (!game) {
      throw new NotFoundException(`Game with slug "${slug}" not found.`);
    }

    return game;
  }

  /**
   * This action returns a game by slug without any filter
   * @param slug
   */
  async findOneWithoutFilter(slug: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: {
        slug: slug
      },
      relations: ['genres'],
    });

    if (!game) {
      throw new NotFoundException(`Game with slug "${slug}" not found.`);
    }

    return game;
  }

  /**
   * This action updates a game by slug
   * @param slug
   * @param updateGameDto
   * @param userId
   */
  async update(slug: string, updateGameDto: UpdateGameDto, userId: number): Promise<Game> {
    const { title, slug: inputSlug } = updateGameDto;
    const game = await this.findOneWithoutFilter(slug);

    this.verifyOwnership(game.userId, userId);

    const currentSlug = inputSlug && inputSlug !== slug ? await this.generateSlug(inputSlug, title) : game.slug;

    const genres = await this.genreRepository.findByIds(updateGameDto.genres);

    const updatedGame = {
      ...game,
      ...updateGameDto,
      genres: genres,
      slug: currentSlug,
      userId: userId
    };

    return this.gameRepository.save(updatedGame);
  }

  /**
   * This action removes a game by slug
   * @param slug
   * @param userId
   */
  async remove(slug: string, userId: number): Promise<DeleteResult> {
    const game = await this.findOneWithoutFilter(slug);

    this.verifyOwnership(game.userId, userId);

    return await this.gameRepository.delete({ slug });
  }

  /**
   * Generate slug
   * @param inputSlug
   * @param title
   * @private
   */
  private async generateSlug(inputSlug: string, title: string): Promise<string> {
    const baseSlug = inputSlug || (await this.appService.generateSlugBy(title));
    return this.appService.generateUniqueSlug(this.gameRepository, 'slug', baseSlug);
  }

  /**
   * Verify ownership of game
   * @private
   * @param gameUserId
   * @param userId
   */
  private verifyOwnership(gameUserId: number, userId: number): void {
    if (gameUserId !== userId) {
      throw new ForbiddenException();
    }
  }
}
