import { Controller, Get, Query } from '@nestjs/common';
import { GroupsTransformPipe } from 'src/core/pipes/groups-transform.pipe';
import { SubjectService } from '../providers/subject.service';

@Controller('api/subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Get()
  async getSubjectsByGroup(
    @Query('groups', GroupsTransformPipe) groups: number[],
  ) {
    return await this.subjectService.getSubjectsByGroup(groups);
  }
  @Get('all')
  async getAllSubjects() {
    return await this.subjectService.getAllSubjects();
  }
  @Get('/groups')
  async getAllGroups() {
    return await this.subjectService.getAllGroups();
  }
}
