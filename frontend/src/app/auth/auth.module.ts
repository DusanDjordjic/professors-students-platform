import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSignupStudentComponent } from './auth-signup-student/auth-signup-student.component';
import { AuthSignupProfessorComponent } from './auth-signup-professor/auth-signup-professor.component';
import { AuthLoginProfessorComponent } from './auth-login-professor/auth-login-professor.component';
import { AuthLoginStudentComponent } from './auth-login-student/auth-login-student.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SubjectsService } from 'src/shared/providers/subjects.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/shared/components/loading-spinner/loading-spinner.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AuthSignupStudentComponent,
    AuthSignupProfessorComponent,
    AuthLoginProfessorComponent,
    AuthLoginStudentComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  providers: [SubjectsService, AuthService],
})
export class AuthModule {}
