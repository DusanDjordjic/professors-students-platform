import { Controller, Get } from '@nestjs/common';
import { SubjectService } from '../providers/subjects.service';

@Controller('api/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectService) {}
  @Get()
  async getAllSubjects() {
    return this.subjectsService.getAll();
  }
}
