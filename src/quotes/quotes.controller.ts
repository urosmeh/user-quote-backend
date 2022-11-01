import { Controller, Get, Param } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuoteWithUserDto } from './dtos/quote-with-user.dto';
import { Quote } from './quote.entity';
import { QuotesService } from './quotes.service';

@Serialize(QuoteWithUserDto)
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get()
  async findAll(): Promise<Quote[]> {
    const quotes = this.quotesService.findAll();
    return quotes;
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Quote> {
    const quote = this.quotesService.findById(parseInt(id));
    return quote;
  }
}
