import { Injectable } from '@nestjs/common';
import { DataSource, ObjectLiteral, ObjectType, Repository } from 'typeorm';

@Injectable()
export class GenericRepository<T extends ObjectLiteral> {
  protected _repository: Repository<T>;
  constructor(dataSource: DataSource, entity: ObjectType<T>) {
    this._repository = dataSource.getRepository(entity);
  }

  getAll(): Promise<T[]> {
    return this._repository.find();
  }

  get(id: any): Promise<T> {
    return this._repository.findOneBy({ id });
  }

  create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  update(id: any, item: T) {
    return this._repository.update({ id }, item);
  }
}
