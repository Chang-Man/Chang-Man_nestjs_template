import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }
  async create(user: User) {
    return this.userRepository.create(user);
  }
}
