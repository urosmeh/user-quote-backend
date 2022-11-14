import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserWithQuoteDto } from './dtos/user-with-quote.dto';
import { UsersService } from './users.service';

@Serialize(UserWithQuoteDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }
}
