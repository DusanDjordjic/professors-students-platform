import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/shared/entities/professor.entity';
import { StudentEntity } from 'src/shared/entities/student.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './providers/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, ProfessorEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
