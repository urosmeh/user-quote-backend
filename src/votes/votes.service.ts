import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';

@Injectable()
export class VotesService {
  constructor(@InjectRepository(Vote) private repo: Repository<Vote>) {}

  async upvote(userId: number, quoteId: number): Promise<Vote> {
    if (await this.voteExists(userId, quoteId, 1)) {
      const vote = this.repo.create({ userId, quoteId, type: 1 });
      await this.repo.save(vote);
      return vote;
    } else {
      throw new MethodNotAllowedException('already voted');
    }
  }

  async downvote(userId: number, quoteId: number): Promise<Vote | void> {
    if (await this.voteExists(userId, quoteId, 0)) {
      const vote = this.repo.create({ userId, quoteId, type: 0 });
      await this.repo.save(vote);
      return vote;
    } else {
      throw new MethodNotAllowedException('already voted');
    }
  }

  async voteExists(userId: number, quoteId: number, type: number) {
    return (await this.repo.count({ where: { userId, quoteId, type } }) === 0);
  }
}
