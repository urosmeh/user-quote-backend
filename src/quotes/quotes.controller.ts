import { Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { QuoteWithUserDto } from './dtos/quote-with-user.dto';
import { QuotesService } from './quotes.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { VotesService } from 'src/votes/votes.service';

@Serialize(QuoteWithUserDto)
@Controller('quotes')
export class QuotesController {
  constructor(
    private quotesService: QuotesService,
    private votesService: VotesService,
  ) {}

  @Get()
  async findAll(@Req() request): Promise<QuoteWithUserDto[]> {
    const quotes = await this.quotesService.findAll();
    return quotes;
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<QuoteWithUserDto> {
    const quote = this.quotesService.findById(parseInt(id));
    return quote;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/upvote')
  async upvote(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ): Promise<QuoteWithUserDto> {
    //todo: remove vote if same type is triggered?
    const userId = request.user.id;
    await this.votesService.upvote(userId, parseInt(id));
    return await this.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/downvote')
  async downvote(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ): Promise<QuoteWithUserDto> {
    //todo: check if user already downvoted this quote
    const userId = request.user.id;
    const quote = await this.findById(id);
    return quote;
  }
}
