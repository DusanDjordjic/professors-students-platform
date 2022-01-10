import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateUser } from './profile/guards/canActivateUser.guard';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './static-pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
