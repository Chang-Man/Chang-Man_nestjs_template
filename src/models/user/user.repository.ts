import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findByPhone(phone: string) {
    return await this.findOneBy({ phone });
  }
}
