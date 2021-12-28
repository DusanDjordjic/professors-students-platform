import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningWayEntity } from './shared/entities/learning-way.entity';

@Controller()
export class AppController {
  //   constructor(
  //     @InjectRepository(LearningWayEntity)
  //     private learingWayRepo: Repository<LearningWayEntity>,
  //   ) {}
  //   @Get('learingway/:way')
  //   async addLearingWay(@Param('way') way: string) {
  //     console.log(way);
  //     const newLW = this.learingWayRepo.create({ _id: 0, name: way });
  //     return await this.learingWayRepo.save(newLW);
  //   }
}
