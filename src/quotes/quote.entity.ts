import { Expose } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Expose()
  @ManyToOne(() => User, (user) => user.quotes)
  user: User;
}
