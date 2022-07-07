import { User } from 'src/users/user.entity';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
