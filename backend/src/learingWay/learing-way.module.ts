import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningWayEntity } from 'src/shared/entities/learning-way.entity';
import { LearingWayController } from './controllers/learing-way.controller';
import { LearingWayService } from './providers/learing-way.service';

@Module({
  imports: [TypeOrmModule.forFeature([LearningWayEntity])],
  controllers: [LearingWayController],
  providers: [LearingWayService],
})
export class LearingWayModule {}
