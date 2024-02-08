import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interface/user.interface';
import { BaseTimeEntity } from 'src/common/entity/response/base-time.entity';

@Entity({
  name: 'users',
})
export class User extends BaseTimeEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 20 })
  name: string;
  @Column({ type: 'varchar', length: 60 })
  password: string;
  @Column({ type: 'varchar', length: 40 })
  email: string;
}
