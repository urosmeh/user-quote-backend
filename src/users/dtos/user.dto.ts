import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  token: string;
}
