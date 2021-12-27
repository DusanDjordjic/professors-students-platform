import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;
}
