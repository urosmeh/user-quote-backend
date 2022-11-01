import { Exclude, Expose } from 'class-transformer';
import { Quote } from 'src/quotes/quote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Quote, (quote) => quote.user)
  quotes: Quote[];
}
