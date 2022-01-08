import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/shared/entities/professor.entity';
import { StudentEntity } from 'src/shared/entities/student.entity';
import { UserType } from 'src/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
    @InjectRepository(ProfessorEntity)
    private readonly professorRepo: Repository<ProfessorEntity>,
  ) {}
  
  async getUser(type: UserType, username: string) {
    if (type == 'student') {
      return await this.studentRepo.findOne({ username: username });
    } else if (type == 'professor') {
      return await this.professorRepo.findOne({ username: username });
    } else {
      return null;
    }
  }
}
