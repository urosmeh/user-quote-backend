import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @Expose() //TODO: create dto ?
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  quote: string;

  @Expose()
  @Column({ default: 0 })
  upvotes: number;

  @Expose()
  @Column({ default: 0 })
  downvotes: number;

  // @Expose()
  // @OneToOne(() => User, (user) => user.quote)
  // user: User;
}
