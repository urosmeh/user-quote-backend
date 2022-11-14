import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { QuotesController } from './quotes.controller';
import { VotesModule } from 'src/votes/votes.module';
import { VotesService } from 'src/votes/votes.service';
import { Vote } from '../votes/vote.entity';

@Module({
  imports: [VotesModule, TypeOrmModule.forFeature([Quote, Vote])],
  providers: [QuotesService, VotesService],
  exports: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
