import { Exclude } from 'class-transformer';
import { Quote } from 'src/quotes/quote.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => Quote)
  @JoinColumn()
  quote: Quote;
}
