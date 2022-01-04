import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginProfessorComponent } from './auth/auth-login-professor/auth-login-professor.component';
import { AuthLoginStudentComponent } from './auth/auth-login-student/auth-login-student.component';
import { AuthSignupProfessorComponent } from './auth/auth-signup-professor/auth-signup-professor.component';
import { AuthSignupStudentComponent } from './auth/auth-signup-student/auth-signup-student.component';
import { CanActivateUser } from './profile/guards/canActivateUser.guard';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './static-pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/signup/student',
    component: AuthSignupStudentComponent,
  },
  {
    path: 'auth/signup/professor',
    component: AuthSignupProfessorComponent,
  },
  {
    path: 'auth/login/student',
    component: AuthLoginStudentComponent,
  },
  {
    path: 'auth/login/professor',
    component: AuthLoginProfessorComponent,
  },
  {
    path: 'moj-profil',
    component: ProfileComponent,
    canActivate: [CanActivateUser],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
