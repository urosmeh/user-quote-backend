import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { UpdateUserDto } from './dtos/update-user-dto';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  constructor(private usersService: UsersService) {}

  @Get()
  getCurrentUser(@Req() request: RequestWithUser) {
    //TODO: add users quote?
    const user = request.user;
    user.password = undefined;
    return request.user;
  }

  @Patch('update-password')
  updatePassword(
    @Req() request: RequestWithUser,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUsersPass(request.user.id, body.password)
  }
}
