import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }
  async create(user: User) {
    return this.userRepository.create(user);
  }
}
