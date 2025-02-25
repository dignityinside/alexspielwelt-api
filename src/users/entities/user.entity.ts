import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '@/auth/enums/role.enum';
import { Game } from '@/games/entities/game.entity';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32, unique: true })
  username: string;

  @Column({ length: 100, nullable: true })
  @Expose()
  name: string;

  @Column({ length: 255 })
  passwordHash: string

  @Column({ length: 255, unique: true })
  email: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  // TODO PostgreSQL
  // @Column({ default: Role.User})
  // roles: Role[];

  @Column('varchar', { length: 255, default: JSON.stringify([Role.User]) })
  roles: Role[];

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];
}
