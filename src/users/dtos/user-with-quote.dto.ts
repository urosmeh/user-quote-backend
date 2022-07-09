import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Quote } from 'src/quotes/quote.entity';

export class UserWithQuoteDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @ValidateNested()
  @Expose()
  @Type(() => Quote)
  quote: Quote;
}
