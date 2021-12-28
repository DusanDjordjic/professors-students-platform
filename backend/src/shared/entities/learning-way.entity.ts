import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LearningWayEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;
}
