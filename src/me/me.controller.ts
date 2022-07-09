import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserWithQuoteDto } from 'src/users/dtos/user-with-quote.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { UpdateUserDto } from './dtos/update-user-dto';

@Serialize(UserWithQuoteDto)
@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  constructor(private usersService: UsersService) {}

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
}
