import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteType } from 'src/common/interfaces/vote-type.enum';
import { Repository } from 'typeorm';
import { UpdateQuoteDto } from './dtos/update-quote-dto';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private repo: Repository<Quote>) {}

  async findAll(): Promise<Quote[]> {
    const quotes = await this.repo.find({ relations: { user: true } });
    return quotes;
  }

  async findById(id: number) {
    const quote = await this.repo.findOne({
      relations: { user: true },
      where: { id },
    });

    if (!quote) {
      throw new NotFoundException();
    }
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

  async vote(id: number, voteType: VoteType) {
    const quote = await this.findById(id);
    voteType === VoteType.UPVOTE ? quote.upvotes++ : quote.downvotes++;
    return this.repo.save(quote);
  }
}
