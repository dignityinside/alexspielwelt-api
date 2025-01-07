import { Module } from '@nestjs/common';
import { GenresService } from '@/genres/genres.service';
import { GenresController } from '@/genres/genres.controller';
import { AppService } from '@/app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '@/genres/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
  ],
  controllers: [GenresController],
  providers: [GenresService, AppService],
})

export class GenresModule {}
