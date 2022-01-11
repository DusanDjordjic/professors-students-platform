import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CanActivateUser } from './profile/guards/canActivateUser.guard';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './static-pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [CanActivateUser],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
