import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/common/typeorm/typeorm.repository';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  async findByPhone(phone: string) {
    return this._repository.findOneBy({ phone });
  }
}
