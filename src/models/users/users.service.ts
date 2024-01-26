import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ phone });
  }
  async create(user: User) {
    await this.userRepository.save(user);
  }
}
