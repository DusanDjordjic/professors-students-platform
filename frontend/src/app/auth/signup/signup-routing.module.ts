import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CanActivateAddress } from './guards/can-activate-address.guard';
import { CanActivateContactInfo } from './guards/can-activate-contact-info.guard';
import { CanActivateSubjects } from './guards/can-activate-subjects.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
  },
  {
    path: 'contact-info',
    component: ContactInfoComponent,
    canActivate: [CanActivateContactInfo],
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [CanActivateContactInfo, CanActivateAddress],
  },
  {
    path: 'subjects',
    component: AddressComponent,
    canActivate: [
      CanActivateContactInfo,
      CanActivateAddress,
      CanActivateSubjects,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
