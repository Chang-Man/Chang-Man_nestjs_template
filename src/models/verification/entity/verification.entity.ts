import { BaseTimeEntity } from 'src/common/base/base-time.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verification extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 13 })
  phone: string;
  @Column({ type: 'boolean', default: false })
  verified: boolean;
  @Column({ type: 'varchar', length: 10 })
  code: string;

  static send(phone: string) {
    const verification = new Verification();
    verification.phone = phone;
    const randomNumber = Math.floor(Math.random() * 100000);
    const paddedNumber = randomNumber.toString().padStart(5, '0');
    verification.code = paddedNumber;
    return verification;
  }

  static verify(phone: string, code: string) {
    const verification = new Verification();
    verification.phone = phone;
    verification.code = code;
    verification.createdAt = new Date();
    return verification;
  }
}
