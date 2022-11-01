import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { QuotesController } from './quotes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuotesService],
  exports: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
