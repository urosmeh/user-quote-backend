import { Expose } from 'class-transformer';
import { User } from '../users/user.entity';
import { Vote } from '../votes/vote.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quote {
  @Expose() //TODO: create dto ?
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  quote: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.quotes)
  user: User;

  @Expose()
  @OneToMany(() => Vote, (vote) => vote.quote)
  votes: Vote[];

  @Expose()
  upvotes?: number;

  @Expose()
  downvotes?: number;

  @Expose()
  score?: number;
}
