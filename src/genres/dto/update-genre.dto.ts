import { PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from '@/genres/dto/create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
