import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/quote.entity';
import { QuotesService } from 'src/quotes/quotes.service';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MeController } from './me.controller';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User, Quote])],
  controllers: [MeController],
  providers: [QuotesService],
})
export class MeModule {}
