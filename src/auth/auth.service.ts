import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './jwt-payload.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    //this will throw an error if password incorrect, otherwise it will run normally
    await this.verifyPassword(password, user.password);
    return user;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id }; //TODO: Is this ok?
    return {
      access_token: this.jwtService.sign(payload),
    };
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
      throw new BadRequestException('Wrong credentials!');
    }
  }

  getCookieWithJwt(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    //config service!!!!
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600}`;
  }
}
