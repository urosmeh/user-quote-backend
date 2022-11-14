import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { QuotesService } from '../quotes/quotes.service';
import { Quote } from '../quotes/quote.entity';
import { Vote } from '../votes/vote.entity';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  imports: [VotesModule, TypeOrmModule.forFeature([User, Quote, Vote])],
  providers: [UsersService, QuotesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
