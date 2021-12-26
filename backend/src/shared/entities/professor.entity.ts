import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfessorEntity {
  @PrimaryGeneratedColumn()
  _id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  phoneNumber: string;
  @Column({ type: 'int', nullable: false })
  price: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  subjects: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
}
