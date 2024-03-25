import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../model/user/user.repository';
import { User } from 'src/model/user/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }
  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
