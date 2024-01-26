import { Column, Entity } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { BaseTimeEntity } from 'src/common/base/base-time.entity';

@Entity({
  name: 'users',
})
export class User extends BaseTimeEntity implements IUser {
  @Column({ type: 'varchar', length: 13 })
  phone: string;
  @Column({ type: 'tinyint' })
  age: number;
  @Column({ type: 'varchar', length: 20 })
  nickname: string;
  @Column({ type: 'text', nullable: true })
  profile_img: string;
  @Column({ type: 'boolean' })
  marketing_agree: boolean;

  static signup(phone: string, age: number, marketing_agree: boolean): User {
    const user = new User();
    user.phone = phone;
    user.age = age;
    user.marketing_agree = marketing_agree;
    return user;
  }
}
