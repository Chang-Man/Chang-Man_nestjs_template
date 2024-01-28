import { Column, Entity } from 'typeorm';
import { IUser } from '../interface/user.interface';
import { BaseTimeEntity } from 'src/common/base/base-time.entity';
import {
  NICKNAME_ADJECTIVE,
  NICKNAME_NOUN,
} from '../constant/nickname.constant';
import { getRandomElementFromArray } from 'src/common/utils/random';

@Entity({
  name: 'user',
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
    user.profile_img = 'default_cdn_img';
    const nicknameAdjective = getRandomElementFromArray(
      NICKNAME_ADJECTIVE.split(' '),
    );
    const nicknameNoun = getRandomElementFromArray(
      NICKNAME_NOUN.split(' '),
    ).replaceAll('-', '');
    user.nickname = `${nicknameAdjective} ${nicknameNoun}`;

    return user;
  }
}
