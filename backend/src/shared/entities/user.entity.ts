import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { ContactInfo } from './contact-info.entity';
import { SelectedSubject } from './selected-subject.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  type: 'student' | 'professor';

  @OneToOne(() => ContactInfo, (contact) => contact.user, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  contactInfo: ContactInfo;
  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: Address;
  @OneToMany(() => SelectedSubject, (selectedSubject) => selectedSubject.user)
  selectedSubject: SelectedSubject[];
}
