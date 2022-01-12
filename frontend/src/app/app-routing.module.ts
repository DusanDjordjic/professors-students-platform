import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EditComponent } from './profile/edit/edit.component';
import { CanActivateUser } from './profile/guards/canActivateUser.guard';
import { OverviewComponent } from './profile/overview/overview.component';
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
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
      {
        path: 'notifications',
        component: EditComponent,
      },
      {
        path: 'security',
        component: EditComponent,
      },
      {
        path: 'settings',
        component: EditComponent,
      },
    ],
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
