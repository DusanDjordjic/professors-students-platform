import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CanActivateContactInfo } from './guards/can-activate-contact-info.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
  },
  {
    path: 'contact-info',
    component: ContactInfoComponent,
    // canActivate: [CanActivateContactInfo],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
