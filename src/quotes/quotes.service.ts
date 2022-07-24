import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteType } from 'src/common/interfaces/vote-type.enum';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private repo: Repository<Quote>) {}

  async findById(id: number) {
    const quote = await this.repo.findOne({
      where: { id },
    });
    if (!quote) {
      throw new NotFoundException();
    }
    return quote;
  }

  async create(quote: string): Promise<Quote> {
    return this.repo.save({ quote });
  }

  async vote(id: number, voteType: VoteType) {
    const quote = await this.findById(id);
    voteType === VoteType.UPVOTE ? quote.upvotes++ : quote.downvotes++;
    return this.repo.save(quote);
  }
}
