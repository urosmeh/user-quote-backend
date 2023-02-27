import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Vote } from 'src/votes/vote.entity';
import { Quote } from '../../quotes/quote.entity';

export class UserWithQuoteDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @ValidateNested()
  @Expose()
  @Type(() => Quote)
  quotes: Quote[];

  @ValidateNested()
  @Expose()
  @Type(() => Vote)
  votes: Vote[];

  @Expose()
  avatar?: string;
}
