import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Vote } from 'src/votes/vote.entity';
import { User } from '../../users/user.entity';

export class QuoteWithUserDto {
  @Expose()
  id: number;

  @Expose()
  quote: string;

  @ValidateNested()
  @Expose()
  @Type(() => User)
  user: User;

  @ValidateNested()
  @Expose()
  votes: Vote[];

  @Expose()
  upvotes?: number;

  @Expose()
  downvotes?: number;

  @Expose()
  score?: number;
}
