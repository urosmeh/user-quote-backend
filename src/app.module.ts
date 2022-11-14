import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { MeModule } from './me/me.module';
import { QuotesModule } from './quotes/quotes.module';
import { Quote } from './quotes/quote.entity';
import { VotesModule } from './votes/votes.module';
import { Vote } from './votes/vote.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Quote, Vote],
      synchronize: true,
      // logging: true,
    }),
    MeModule,
    QuotesModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
