import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { UserDto } from '../users/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser): Promise<UserDto> {
    //TODO: fix type in parameters
    const { user } = request;
    const cookie = this.authService.getCookieWithJwt(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.username, body.password);
  }
}
