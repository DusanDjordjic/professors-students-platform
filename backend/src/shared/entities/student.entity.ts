import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  _id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  phoneNumber: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  interests: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
}
