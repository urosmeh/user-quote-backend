import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '../quotes/quote.entity';
import { User } from '../users/user.entity';
import { Vote } from './vote.entity';
import { VotesService } from './votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Quote, User])],
  providers: [VotesService],
  exports: [VotesService],
})
export class VotesModule {}
