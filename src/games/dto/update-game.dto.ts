import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from '@/games/dto/create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {}
