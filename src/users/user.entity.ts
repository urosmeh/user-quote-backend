import { Exclude, Expose } from 'class-transformer';
import { Quote } from '../quotes/quote.entity';
import { Vote } from '../votes/vote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ValidateNested } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  @OneToMany(() => Quote, (quote) => quote.user)
  quotes: Quote[];

  @ValidateNested()
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
