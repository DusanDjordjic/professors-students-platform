import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddressComponent } from './address/address.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { FinalComponent } from './final/final.component';
import { CanActivateAbout } from './guards/can-activate-about.guard';
import { CanActivateAddress } from './guards/can-activate-address.guard';
import { CanActivateContactInfo } from './guards/can-activate-contact-info.guard';
import { CanActivateSubjects } from './guards/can-activate-subjects.guard';
import { SubjectsComponent } from './subjects/subjects.component';
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
  {
    path: 'address',
    component: AddressComponent,
    // canActivate: [CanActivateAddress, CanActivateContactInfo],
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
    // canActivate: [
    //   CanActivateSubjects,
    //   CanActivateAddress,
    //   CanActivateContactInfo,
    // ],
  },
  {
    path: 'about',
    component: AboutComponent,
    // canActivate: [
    //   CanActivateAbout,
    //   CanActivateSubjects,
    //   CanActivateAddress,
    //   CanActivateContactInfo,
    // ],
  },
  {
    path: 'edit',
    component: UserDetailsComponent,
  },
  {
    path: 'contact-info/edit',
    component: ContactInfoComponent,
    // canActivate: [CanActivateContactInfo],
  },
  {
    path: 'address/edit',
    component: AddressComponent,
    // canActivate: [CanActivateAddress, CanActivateContactInfo],
  },
  {
    path: 'subjects/edit',
    component: SubjectsComponent,
    // canActivate: [
    //   CanActivateSubjects,
    //   CanActivateAddress,
    //   CanActivateContactInfo,
    // ],
  },
  {
    path: 'about/edit',
    component: AboutComponent,
    // canActivate: [
    //   CanActivateAbout,
    //   CanActivateSubjects,
    //   CanActivateAddress,
    //   CanActivateContactInfo,
    // ],
  },
  {
    path: 'final',
    component: FinalComponent,
    // canActivate: [
    //   CanActivateFinal
    //   CanActivateAbout,
    //   CanActivateSubjects,
    //   CanActivateAddress,
    //   CanActivateContactInfo,
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
