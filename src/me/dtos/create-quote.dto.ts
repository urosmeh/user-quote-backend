import { IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  quote: string;
}
