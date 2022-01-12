import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectDetails } from './subject-details.entity';
import { User } from './user.entity';

@Entity()
export class SelectedSubject {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.selectedSubject)
  user: User;
  @ManyToOne(() => SubjectDetails, (subjectDetails) => subjectDetails.id)
  subjectDetails: SubjectDetails;
}
