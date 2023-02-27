import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './jwt-payload.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    if (!password || !username) {
      throw new BadRequestException('Password missing');
    }

    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Unauthorized', 'Wrong credentials!');
    }
    //this will throw an error if password incorrect, otherwise it will run normally
    await this.verifyPassword(password, user.password);
    return user;
  }

  async login(userId: number) {
    const payload: TokenPayload = { userId }; //TODO: Is this ok?
    return this.jwtService.sign(payload);
    // console.log(`payload ${JSON.stringify(payload)}`);
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  async signup(username: string, password: string) {
    const users = await this.usersService.find(username);
    if (users.length) {
      throw new BadRequestException('username taken!');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hashedPass);
    return user;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const matching = await bcrypt.compare(password, hashedPassword);

    if (!matching) {
      throw new UnauthorizedException('Unauthorized', 'Wrong credentials!');
    }
  }

  getCookieWithJwt(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    //config service!!!!
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600}`;
  }
}
