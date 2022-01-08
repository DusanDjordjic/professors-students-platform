import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSignupStudentComponent } from './auth-signup-student/auth-signup-student.component';
import { AuthSignupProfessorComponent } from './auth-signup-professor/auth-signup-professor.component';
import { AuthLoginProfessorComponent } from './auth-login-professor/auth-login-professor.component';
import { AuthLoginStudentComponent } from './auth-login-student/auth-login-student.component';
import { SubjectsService } from 'src/shared/providers/subjects.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/shared/components/loading-spinner/loading-spinner.component';

import { LearningWayService } from 'src/shared/providers/learning-way.service';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthSignupStudentComponent,
    AuthSignupProfessorComponent,
    AuthLoginProfessorComponent,
    AuthLoginStudentComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ProfileModule,
  ],
  providers: [SubjectsService, LearningWayService, AuthService],
})
export class AuthModule {}
