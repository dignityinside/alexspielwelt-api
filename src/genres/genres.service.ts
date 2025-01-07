import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from '@/genres/dto/create-genre.dto';
import { UpdateGenreDto } from '@/genres/dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { AppService } from '@/app/app.service';
import { Genre } from '@/genres/entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly appService: AppService
  ) {}

  /**
   * Create a genre
   * @param createGenreDto
   */
  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { name, slug } = createGenreDto;

    const currentSlug = await this.generateSlug(slug, name);

    const genre = {
      ...createGenreDto,
      slug: currentSlug,
    }

    return this.genreRepository.save(genre);
  }

  /**
   * Update a genre by slug
   * @param slug
   * @param updateGenreDto
   */
  async update(slug: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const { name, slug: inputSlug } = updateGenreDto;
    const genre = await this.findOne(slug);

    const currentSlug = inputSlug && inputSlug !== slug ? await this.generateSlug(inputSlug, name) : genre.slug;

    const updateGenre = {
      ...genre,
      ...updateGenreDto,
      slug: currentSlug,
    }

    return this.genreRepository.save(updateGenre);
  }

  /**
   * Remove a genre by slug
   * @param slug
   */
  async remove(slug: string): Promise<DeleteResult> {
    return this.genreRepository.delete({slug});
  }

  /**
   * Returns all genres
   */
  async findAll() {
    return await this.genreRepository.find({
      select: ['id', 'name'],
    });
  }

  /**
   * Find genres by ids
   * @param genres
   */
  async findByIds(genres) {
    return await this.genreRepository.findBy({ id: In(genres) });
  }

  /**
   * Find a genre by slug
   * @param slug
   * @private
   */
  private async findOne(slug: string): Promise<Genre> {
    return await this.genreRepository.findOneBy({ slug: slug });
  }

  /**
   * Generate slug
   * @param inputSlug
   * @param name
   * @private
   */
  private async generateSlug(inputSlug: string, name: string): Promise<string> {
    const baseSlug = inputSlug || (await this.appService.generateSlugBy(name));
    return this.appService.generateUniqueSlug(this.genreRepository, 'slug', baseSlug);
  }
}
