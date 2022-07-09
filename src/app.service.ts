import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  listAll(): string {
    return 'Hello World!';
  }
}
