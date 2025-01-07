import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Status } from '@/games/enums/status.enum';
import { Expose } from 'class-transformer';
import { Genre } from '@/genres/entities/genre.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ length: 150 })
  @Expose()
  title: string;

  @Column({ length: 60, unique: true })
  @Expose()
  slug: string;

  @Column({ length: 255, nullable: true })
  @Expose()
  intro: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  description: string;

  @Column({ length: 255, nullable: true })
  @Expose()
  slogan: string;

  @Column({ length: 255, nullable: true })
  @Expose()
  img: string;

  @Column({ length: 255, nullable: true })
  link: string;

  @Column({ length: 255, nullable: true })
  @Expose()
  publisher: string;

  @Column({ nullable: true })
  @Expose()
  releaseYear: number;

  @Column({ nullable: true })
  @Expose()
  players: string;

  @Column({ nullable: true })
  @Expose()
  playTime: string;

  @Column({ nullable: true })
  @Expose()
  rating: number;

  @Column({ nullable: true })
  @Expose()
  difficulty: number;

  @Column({ length: 10, nullable: true })
  @Expose()
  recommendedAge: string;

  @Column({ nullable: true })
  @Expose()
  award: string;

  @Column({ nullable: true })
  @Expose()
  gameDesigner: string;

  @Column({ nullable: true })
  @Expose()
  hits: number;

  @Column({ length: 60, nullable: true })
  @Expose()
  metaTitle: string;

  @Column({ length: 160, nullable: true })
  @Expose()
  metaDescription: string;

  @Column({ type: 'varchar', length: 13, unique: true, nullable: true })
  @Expose()
  ean: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Expose()
  uvp: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Expose()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.games)
  @JoinColumn({ name: 'userId' })
  @Expose()
  user: User;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.DRAFT,
  })
  @Expose()
  status: Status;

  @ManyToMany(() => Genre)
  @JoinTable()
  @Expose()
  genres: Genre[];
}