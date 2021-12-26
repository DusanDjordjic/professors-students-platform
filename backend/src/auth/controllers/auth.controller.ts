import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AddStudentDtoValidationPipe } from 'src/core/pipes/add-student-dto-validation.pipe';
import { LoginStudentValidationPipe } from 'src/core/pipes/login-student-dto-validation.pipe';
import { AddStudentDto } from 'src/shared/dto/add-student.dto';
import { LoginStudentDto } from 'src/shared/dto/login-student.dto';
import { AuthService } from '../providers/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login/professor')
  async loginProfessor() {
    return 'login professor';
  }
  @Post('login/student')
  async loginStudent(
    @Body(new LoginStudentValidationPipe()) loginStudentDto: LoginStudentDto,
  ) {
    return this.authService.loginStudent(loginStudentDto);
  }
  @Post('signup/student')
  async signupStudent(
    @Body(new AddStudentDtoValidationPipe()) student: AddStudentDto,
  ) {
    return this.authService.signupStudent(student);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
