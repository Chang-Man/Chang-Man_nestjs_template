import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({
  name: 'users',
})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 13 })
  phone: string;
  @Column({ type: 'tinyint' })
  age: number;
  @Column({ type: 'varchar', length: 20 })
  nickname: string;
  @Column({ type: 'text' })
  profile_img: string;
  @Column({ type: 'boolean' })
  marketing_agree: boolean;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
