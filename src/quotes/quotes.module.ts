import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
