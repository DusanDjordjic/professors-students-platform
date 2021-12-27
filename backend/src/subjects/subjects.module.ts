import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/shared/entities/subject.entity';
import { SubjectsController } from './controllers/subjects.controller';
import { SubjectService } from './providers/subjects.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [SubjectService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
