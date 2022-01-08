import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupDetails } from './group-details.entity';
import { SelectedSubject } from './selected-subject.entity';

@Entity()
export class SubjectDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @ManyToOne(() => GroupDetails, (groupDetails) => groupDetails.subjectDetails)
  groupDetails: GroupDetails;
  @OneToMany(
    () => SelectedSubject,
    (selectedSubject) => selectedSubject.subjectDetails,
  )
  selectedSubject: SelectedSubject[];
}
