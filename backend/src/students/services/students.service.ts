import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/shared/entities/student.entity';

import { Repository } from 'typeorm';
import { AddStudentDto } from '../../shared/dto/add-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}
  getAllStudents() {
    return this.studentRepository.find();
  }
  async addStudent(student: AddStudentDto) {
    const newStudent = this.studentRepository.create({
      _id: 0,
      name: student.name,
      lastName: student.lastName,
      username: student.username,
      email: student.email,
      phoneNumber: student.phoneNumber,
      interests: student.interests,
      password: student.password,
    });

    const savedStudent = await this.studentRepository.save(newStudent);
    console.log({ savedStudent });
    return savedStudent;
  }
}
