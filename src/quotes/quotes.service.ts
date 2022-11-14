import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateQuoteDto } from './dtos/update-quote-dto';
import { Quote } from './quote.entity';
import { QuoteStats } from '../common/interfaces/quote-stats.interface';
import { calculateQuoteStats } from 'src/common/utils/calculate-quote-stats';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private repo: Repository<Quote>) {}

  async findAll(): Promise<Quote[]> {
    let quotes = await this.repo.find({
      relations: { user: true, votes: true },
    });

    quotes.map((quote) => {
      const stats: QuoteStats = calculateQuoteStats(quote);
      quote.upvotes = stats.upvotes;
      quote.downvotes = stats.downvotes;
    });

    quotes.sort((a, b) => a.upvotes - b.upvotes).reverse();

    return quotes;
  }

  async findById(id: number) {
    const quote = await this.repo.findOne({
      relations: { user: true, votes: true },
      where: { id },
    });

    if (!quote) {
      throw new NotFoundException();
    }

    const stats: QuoteStats = calculateQuoteStats(quote);
    quote.upvotes = stats.upvotes;
    quote.downvotes = stats.downvotes;

    return quote;
  }

  async create(quote: string, user): Promise<Quote> {
    return this.repo.save({ quote, user });
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const { quote } = updateQuoteDto;
    const existingQuote = await this.findById(id);
    if (!existingQuote) {
      throw new NotFoundException('Quote not found!');
    }

    existingQuote.quote = quote;
    return this.repo.save(existingQuote);
  }
}
