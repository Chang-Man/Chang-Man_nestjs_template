import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string) {
    return await this.findOneBy({ email });
  }
}
