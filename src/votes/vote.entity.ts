import { Expose } from 'class-transformer';
import { Quote } from '../quotes/quote.entity';
import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  userId: number;

  @Column()
  @Expose()
  quoteId: number;

  @Column()
  @Expose()
  type: number;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Quote, (quote) => quote.votes)
  @JoinColumn({ name: 'quoteId' })
  quote: Quote;
}
