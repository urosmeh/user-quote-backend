import {
  Body,
  Controller,
  Get,
  MethodNotAllowedException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateQuoteDto } from 'src/quotes/dtos/update-quote-dto';
import { QuotesService } from 'src/quotes/quotes.service';
import { UserWithQuoteDto } from 'src/users/dtos/user-with-quote.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateUserDto } from './dtos/update-user-dto';

@Serialize(UserWithQuoteDto)
@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  constructor(
    private usersService: UsersService,
    private quotesService: QuotesService,
  ) {}

  @Get()
  async getCurrentUser(@Req() request: RequestWithUser) {
    //TODO: add users quote?
    const userId = request.user.id;
    const user = await this.usersService.findById(userId);
    return user;
  }

  @Patch('update-password')
  updatePassword(@Req() request: RequestWithUser, @Body() body: UpdateUserDto) {
    return this.usersService.updateUsersPass(request.user.id, body.password);
  }

  @Post('my-quote')
  async createQuote(
    @Req() request: RequestWithUser,
    @Body() body: CreateQuoteDto,
  ) {
    const user = request.user;
    return await this.quotesService.create(body.quote, user);
  }

  @Patch('my-quote/:id')
  async updateQuote(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() body: UpdateQuoteDto,
  ) {
    const user = request.user;

    const quote = await this.quotesService.findById(parseInt(id));

    if (quote.user.id !== user.id) {
      throw new MethodNotAllowedException('You can only edit your own quotes!');
    }

    return await this.quotesService.update(parseInt(id), body);
  }
}
