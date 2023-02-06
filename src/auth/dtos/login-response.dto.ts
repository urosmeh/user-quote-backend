import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  token: string;

  @Expose()
  username: string;

  @Expose()
  id: number;
}
