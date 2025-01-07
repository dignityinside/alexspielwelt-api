import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  slug: string;
}
