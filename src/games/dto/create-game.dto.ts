import { IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, Length, Matches, Max, Min } from 'class-validator';
import { Status } from '@/games/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@/genres/entities/genre.entity';

export class CreateGameDto {
  @IsString()
  @Length(1, 150)
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  @ApiProperty()
  slug: string;

  @IsString()
  @ApiProperty()
  intro: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  slogan: string;

  @IsUrl()
  @ApiProperty()
  img: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  link: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  publisher: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty()
  releaseYear: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  players: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  playTime: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  genre: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  @ApiProperty()
  difficulty: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  recommendedAge: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  award: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  gameDesigner: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  hits: number;

  @IsOptional()
  @IsString()
  @Length(1, 60)
  @ApiProperty()
  metaTitle: string;

  @IsOptional()
  @IsString()
  @Length(1, 160)
  @ApiProperty()
  metaDescription: string;

  @IsOptional()
  @Matches(/^\d{8}$|^\d{13}$/)
  @ApiProperty()
  ean: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty()
  uvp: number;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @IsInt()
  userId: number

  @ApiProperty()
  genres: Genre[]
}