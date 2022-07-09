import { Expose } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @Expose() //TODO: create dto ?
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  quote: string;

  @Expose()
  @Column()
  upvotes: number;

  @Expose()
  @Column()
  downvotes: number;

  // @Expose()
  // @OneToOne(() => User, (user) => user.quote)
  // user: User;
}
