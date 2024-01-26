import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 13 })
  phone: string;
  @Column({ type: 'boolean' })
  verified: boolean;
  @Column({ type: 'varchar', length: 10 })
  code: string;
}
