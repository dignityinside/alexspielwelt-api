import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Status } from '@/games/enums/status.enum';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 60, unique: true })
  slug: string;

  @Column({ length: 255, nullable: true })
  intro: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  slogan: string;

  @Column({ length: 255, nullable: true })
  img: string;

  @Column({ length: 255, nullable: true })
  link: string;

  @Column({ length: 255, nullable: true })
  publisher: string;

  @Column({ nullable: true })
  releaseYear: number;

  @Column({ nullable: true })
  players: string;

  @Column({ nullable: true })
  playTime: string;

  @Column({ length: 150, nullable: true })
  genre: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  difficulty: number;

  @Column({ length: 10, nullable: true })
  recommendedAge: string;

  @Column({ nullable: true })
  award: string;

  @Column({ nullable: true })
  gameDesigner: string;

  @Column({ nullable: true })
  hits: number;

  @Column({ length: 60, nullable: true })
  metaTitle: string;

  @Column({ length: 160, nullable: true })
  metaDescription: string;

  @Column({ type: 'varchar', length: 13, unique: true, nullable: true })
  ean: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  uvp: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.games)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Draft,
  })
  status: Status;
}