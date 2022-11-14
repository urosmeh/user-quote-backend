import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
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

  @Expose()
  upvotes?: number;

  @Expose()
  downvotes?: number;

  // @ValidateNested()
  // @Expose()
  // @Type(() => Vote)
  // votes: Vote[];
}
