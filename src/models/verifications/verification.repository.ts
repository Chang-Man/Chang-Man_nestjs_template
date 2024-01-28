import { Injectable } from '@nestjs/common';
import { Verification } from './entities/verification.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VerificationRepository extends Repository<Verification> {
  constructor(private dataSource: DataSource) {
    super(Verification, dataSource.createEntityManager());
  }
}
