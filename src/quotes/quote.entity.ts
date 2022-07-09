import { User } from 'src/users/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;

  @Column()
  upvotes: number;

  @Column()
  downvotes: number;

  @OneToOne(() => User, (user) => user.quote)
  user: User;
}
