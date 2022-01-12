import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDetails } from 'src/shared/entities/group-details.entity';
import { SelectedSubject } from 'src/shared/entities/selected-subject.entity';
import { SubjectDetails } from 'src/shared/entities/subject-details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectDetails)
    private readonly subjectRepo: Repository<SubjectDetails>,
    @InjectRepository(GroupDetails)
    private readonly groupRepo: Repository<GroupDetails>,
    @InjectRepository(SelectedSubject)
    private readonly selectedSubjectRepo: Repository<SelectedSubject>,
  ) {}
  async getSubjectsByGroup(groups: number[]) {
    try {
      let subjects = await this.subjectRepo
        .createQueryBuilder('subject')
        .select()
        .leftJoinAndSelect('subject.groupDetails', 'groupDetails')
        .orderBy('groupDetails.id', 'ASC')
        .getMany();

      subjects = subjects.filter((sub) => groups.includes(sub.groupDetails.id));
      return subjects;
    } catch (err) {
      console.log(err);
      throw new HttpException('Unhandled error', 500);
    }
  }
  async getAllSubjects() {
    try {
      let subjects = await this.subjectRepo
        .createQueryBuilder('subject')
        .select()
        .leftJoinAndSelect('subject.groupDetails', 'groupDetails')
        .orderBy('groupDetails.id', 'ASC')
        .getMany();
      return subjects;
    } catch (err) {
      console.log(err);
      throw new HttpException('Unhandled error', 500);
    }
  }
  async getAllGroups() {
    try {
      const groups = await this.groupRepo
        .createQueryBuilder('subject')
        .select()
        .getMany();
      return groups;
    } catch (err) {
      console.log(err);
      throw new HttpException('Unhandled error', 500);
    }
  }
}
