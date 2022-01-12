import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ValidateShapePipe } from 'src/core/pipes/shape-validate.pipe';
import { RequestShapeType } from 'src/shared/types/request-shape.type';
import { UserType } from 'src/shared/types/user.type';
import { UsersService } from '../providers/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsersByType(@Query('type') type: UserType) {
    return this.userService.getAllUsersByType(type);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getOwnersProfile(
    @Query('shape', ValidateShapePipe) shape: RequestShapeType,
    @Req() req: Request,
  ) {
    if (!req.user) throw new HttpException('UnAuthorized', 403);

    return await this.userService.getUserProfile(
      (req.user as any).username || '',
      shape,
    );
  }
  @Get(':username/profile')
  @UseGuards(JwtAuthGuard)
  async getUsersProfile(
    @Query('shape', ValidateShapePipe) shape: RequestShapeType,
    @Param('username') username: string,
    @Req() req: Request,
  ) {
    if (!req.user) throw new HttpException('UnAuthorized', 403);

    return await this.userService.getUserProfile(username || '', shape);
  }
}
