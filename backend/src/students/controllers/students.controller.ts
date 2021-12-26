import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AddStudentDtoValidationPipe } from 'src/core/pipes/add-student-dto-validation.pipe';
import { AddStudentDto } from '../../shared/dto/add-student.dto';
import { StudentsService } from '../services/students.service';

@Controller('api/students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }
  @Post()
  async addStudent(
    @Body(new AddStudentDtoValidationPipe()) student: AddStudentDto,
  ) {
    try {
      const savedStudent = await this.studentsService.addStudent(student);
      return savedStudent;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
