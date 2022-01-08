import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => User, (user) => user.contactInfo, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  user: User;
}
