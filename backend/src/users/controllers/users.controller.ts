import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserType } from 'src/shared/types/user.type';
import { UsersService } from '../providers/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsersByType(@Query('type') type: UserType) {
    return this.userService.getAllUsersByType(type);
  }
}
