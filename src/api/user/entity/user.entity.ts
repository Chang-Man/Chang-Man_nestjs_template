import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interface/user.interface';
import { BaseTimeEntity } from 'src/common/entity/base-time.entity';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { getHash } from 'src/common/utils/hash';

@Entity({
  name: 'users',
})
export class User extends BaseTimeEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  name: string;

  @Exclude()
  @Column({ type: 'varchar', length: 60 })
  @ApiProperty()
  password: string;

  @Expose()
  @Column({ type: 'varchar', length: 40 })
  @ApiProperty()
  email: string;

  static signup(name: string, email: string, password: string): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return user;
  }
  async updateHashedPassword(): Promise<void> {
    this.password = await getHash(this.password);
  }
}
