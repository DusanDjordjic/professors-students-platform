import { InjectRepository } from '@nestjs/typeorm';
import { LearningWayEntity } from 'src/shared/entities/learning-way.entity';
import { Repository } from 'typeorm';

export class LearingWayService {
  constructor(
    @InjectRepository(LearningWayEntity)
    private readonly learingWayRepo: Repository<LearningWayEntity>,
  ) {}
  async getAllLearingWays() {
    return await this.learingWayRepo.find();
  }
}
