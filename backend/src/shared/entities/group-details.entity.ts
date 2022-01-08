import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectDetails } from './subject-details.entity';

@Entity()
export class GroupDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => SubjectDetails,
    (subjectDetails) => subjectDetails.groupDetails,
  )
  subjectDetails: SubjectDetails[];
}
