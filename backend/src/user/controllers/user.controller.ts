import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserType } from 'src/types/user.type';
import { UserService } from '../providers/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(new JwtAuthGuard())
  async getUserDetails(@Request() req: any, @Query('type') type: any) {
    console.log({ type });

    const user = await this.userService.getUser(type, req.user.username);
    if (user === null) {
      throw new HttpException('Ne postoji user', 404);
    } else {
      return user;
    }
  }
}
