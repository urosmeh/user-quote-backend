import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from 'src/votes/vote.entity';
import { VotesModule } from 'src/votes/votes.module';
import { Quote } from '../quotes/quote.entity';
import { QuotesService } from '../quotes/quotes.service';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { MeController } from './me.controller';

@Module({
  imports: [
    UsersModule,
    VotesModule,
    TypeOrmModule.forFeature([User, Quote, Vote]),
  ],
  controllers: [MeController],
  providers: [QuotesService],
})
export class MeModule {}
