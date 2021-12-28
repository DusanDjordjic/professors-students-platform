import { Controller, Get } from '@nestjs/common';
import { LearingWayService } from '../providers/learing-way.service';

@Controller('api/learningways')
export class LearingWayController {
  constructor(private readonly learingWayService: LearingWayService) {}
  @Get()
  async getLearingWays() {
    return await this.learingWayService.getAllLearingWays();
  }
}
