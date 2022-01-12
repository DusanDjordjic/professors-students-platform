import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDetails } from 'src/shared/entities/group-details.entity';
import { SelectedSubject } from 'src/shared/entities/selected-subject.entity';
import { SubjectDetails } from 'src/shared/entities/subject-details.entity';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './providers/subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectDetails, GroupDetails, SelectedSubject]),
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
