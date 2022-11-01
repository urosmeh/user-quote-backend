import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VoteType } from 'src/common/interfaces/vote-type.enum';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuotesService } from 'src/quotes/quotes.service';
import { UserWithQuoteDto } from './dtos/user-with-quote.dto';
import { UsersService } from './users.service';

@Serialize(UserWithQuoteDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private quotesService: QuotesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/upvote')
  async upvote(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    // if (!user.quote) {
    //   throw new NotFoundException('User has no quotes!');
    // }
    
    //todo: FIX QUOTES HERE!
    // const quote = await this.quotesService.vote(user.quote.id, VoteType.UPVOTE);

    // Object.assign(user.quote, quote);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/downvote')
  async downvote(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    // if (!user.quote) {
    //   throw new NotFoundException('User has no quotes!');
    // }

    // //todo: FIX QUOTES HERE!
    // const quote = await this.quotesService.vote(
    //   user.quote.id,
    //   VoteType.DOWNVOTE,
    // );

    // Object.assign(user.quote, quote);
    return user;
  }
}
