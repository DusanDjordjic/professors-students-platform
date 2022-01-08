import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  streetNumber: string;
  @OneToOne(() => User, (user) => user.contactInfo, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  user: User;
}
