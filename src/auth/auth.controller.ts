import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser): Promise<User> {
    //TODO: fix type in parameters
    const { user } = request;
    const cookie = this.authService.getCookieWithJwt(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    //TODO: password should be excluded with serializer maybe??
    user.password = undefined;
    return user;
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.username, body.password);
  }
}
