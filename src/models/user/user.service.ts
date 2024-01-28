import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ phone });
  }
  async create(user: User) {
    await this.userRepository.save(user);
  }
}
