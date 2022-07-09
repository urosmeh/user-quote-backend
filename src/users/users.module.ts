import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { QuotesService } from 'src/quotes/quotes.service';
import { QuotesModule } from 'src/quotes/quotes.module';
import { Quote } from 'src/quotes/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Quote])],
  providers: [UsersService, QuotesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
