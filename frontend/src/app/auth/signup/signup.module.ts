import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupService } from './signup.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CanActivateContactInfo } from './guards/can-activate-contact-info.guard';
import { AddressComponent } from './address/address.component';
import { CanActivateAddress } from './guards/can-activate-address.guard';
import { CanActivateSubjects } from './guards/can-activate-subjects.guard';
import { SubjectsComponent } from './subjects/subjects.component';
import { SignupSubjectsService } from './signup-subject.service';
import { SubStringDirective } from 'src/shared/directives/sub-string.directive';

@NgModule({
  providers: [
    SignupService,
    CanActivateContactInfo,
    CanActivateAddress,
    CanActivateSubjects,
    SignupSubjectsService,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    UserDetailsComponent,
    ContactInfoComponent,
    AddressComponent,
    SubjectsComponent,
    SubStringDirective,
  ],
})
export class SignupModule {}
