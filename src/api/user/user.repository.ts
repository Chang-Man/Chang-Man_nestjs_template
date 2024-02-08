import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/common/typeorm/typeorm.repository';
import { User } from './entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  async findByEmail(email: string) {
    return this._repository.findOneBy({ email });
  }
}
