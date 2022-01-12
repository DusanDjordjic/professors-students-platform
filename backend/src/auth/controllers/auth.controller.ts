import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { LoginDataDto } from 'src/shared/dto/login-data.dto';

import { CreateUserDto } from 'src/shared/dto/user.dto';
import { ValidateDto } from '../pipes/validate-dto.pipe';
import { AuthService } from '../providers/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // > PROFESSOR
  @Post('signup')
  async signupUser(@Body(ValidateDto) userDetails: CreateUserDto) {
    return this.authService.signupUser(userDetails);
  }
  @Post('login')
  async loginUSer(@Body(ValidateDto) userData: LoginDataDto) {
    return this.authService.loginUser(userData);
  }
  // @Post('login/professor')
  // async loginProfessor(
  //   @Body(new LoginProfessorValidationPipe())
  //   loginProfessorDto: LoginProfessorDto,
  // ) {
  //   return this.professorAuthService.loginProfessor(loginProfessorDto);
  // }
  // @Post('signup/professor')
  // async signupProfessor(
  //   @Body(new AddProfessorDtoValidationPipe()) professor: AddProfessorDto,
  // ) {
  //   return this.professorAuthService.signupProfessor(professor);
  // }

  // // > STUDENT

  // @Post('login/student')
  // async loginStudent(
  //   @Body(new LoginStudentValidationPipe()) loginStudentDto: LoginStudentDto,
  // ) {
  //   return this.studentAuthService.loginStudent(loginStudentDto);
  // }
  // @Post('signup/student')
  // async signupStudent(
  //   @Body(new AddStudentDtoValidationPipe()) student: AddStudentDto,
  // ) {
  //   return this.studentAuthService.signupStudent(student);
  // }

  // // > PROTECTED DEMO ROUTE

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async profile(@Request() req) {
  //   return req.user;
  // }
}
