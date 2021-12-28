import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginProfessorComponent } from './auth-login-professor/auth-login-professor.component';
import { AuthLoginStudentComponent } from './auth-login-student/auth-login-student.component';
import { AuthSignupProfessorComponent } from './auth-signup-professor/auth-signup-professor.component';
import { AuthSignupStudentComponent } from './auth-signup-student/auth-signup-student.component';

const routes: Routes = [
  { path: 'signup/student', component: AuthSignupStudentComponent },
  { path: 'signup/professor', component: AuthSignupProfessorComponent },
  { path: 'login/student', component: AuthLoginStudentComponent },
  { path: 'login/professor', component: AuthLoginProfessorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
