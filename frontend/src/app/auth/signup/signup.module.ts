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

@NgModule({
  providers: [
    SignupService,
    CanActivateContactInfo,
    CanActivateAddress,
    CanActivateSubjects,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [UserDetailsComponent, ContactInfoComponent, AddressComponent],
})
export class SignupModule {}
