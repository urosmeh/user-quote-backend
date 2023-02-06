import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // console.log(request?.headers?.authorization);
          // return request?.cookies?.Authentication;
          return request?.headers?.authorization;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  //TODO: define payload type (interface)
  async validate(payload: TokenPayload) {
    return this.usersService.findById(payload.userId);
  }
}
