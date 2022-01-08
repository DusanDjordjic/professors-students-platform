import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AddProfessorDtoValidationPipe } from 'src/core/pipes/add-professor-dto-validation.pipe';
import { AddStudentDtoValidationPipe } from 'src/core/pipes/add-student-dto-validation.pipe';
import { LoginProfessorValidationPipe } from 'src/core/pipes/login-professor-dto-validation.pipe';
import { LoginStudentValidationPipe } from 'src/core/pipes/login-student-dto-validation.pipe';
import { AuthService } from '../providers/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // > PROFESSOR

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
