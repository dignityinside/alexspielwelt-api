import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from '@/games/entities/game.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  @Expose()
  @ApiProperty()
  id: number;

  @Column({ length: 50 })
  @Expose()
  @ApiProperty()
  name: string;

  @Column({ length: 60, unique: true })
  @Expose()
  @ApiProperty()
  slug: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @ApiProperty()
  games: Game[];
}
