import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteStats } from '../common/interfaces/quote-stats.interface';
import { calculateQuoteStats } from 'src/common/utils/calculate-quote-stats';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(username: string, password: string): Promise<User | undefined> {
    const user = this.repo.create({ username, password });
    this.repo.save(user);
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.repo.findOne({
      relations: { quotes: true },
      where: { username },
    }); //username is unique, so this should be ok...
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.repo.findOne({
      relations: { quotes: { votes: true }, votes: true },
      where: { id },
    });

    user.quotes.forEach((quote) => {
      const stats: QuoteStats = calculateQuoteStats(quote);
      quote.upvotes = stats.upvotes;
      quote.downvotes = stats.downvotes;
      delete quote.votes;
    });

    user.quotes.sort((a, b) => a.upvotes - b.upvotes).reverse();

    return user;
  }

  async find(username: string): Promise<User[] | []> {
    return this.repo.find({ where: { username } });
  }

  async updateUsersPass(id: number, password: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user.password = hashedPass;

    return this.repo.save(user);
  }

  async setUserAvatar(id: number, filename: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.avatar = filename;

    return this.repo.save(user);
  }
}
