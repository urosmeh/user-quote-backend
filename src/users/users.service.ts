import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Uros',
      username: 'uros',
      password: 'geslo123',
    },
    {
      id: 2,
      name: 'Suzana',
      username: 'suzi',
      password: 'geslo1234',
    },
    {
      id: 3,
      name: 'Jane',
      username: 'jane',
      password: 'geslo123',
    },
    {
      id: 4,
      name: 'John',
      username: 'john',
      password: 'geslo123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
