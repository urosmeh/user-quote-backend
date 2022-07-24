import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
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
    const quote = await this.quotesService.create(body.quote);
    // Object.assign(user.quote, quote);
    return this.usersService.updateQuote(user.id, quote);
  }
}
