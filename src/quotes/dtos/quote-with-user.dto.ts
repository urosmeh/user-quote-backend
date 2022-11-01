import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Quote } from 'src/quotes/quote.entity';
import { User } from 'src/users/user.entity';

export class QuoteWithUserDto {
  @Expose()
  id: number;

  @Expose()
  quote: string;

  @ValidateNested()
  @Expose()
  @Type(() => User)
  user: User;
}
