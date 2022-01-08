import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupService } from './signup.service';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  providers: [SignupService],
  imports: [CommonModule, SignupRoutingModule, ReactiveFormsModule],
  declarations: [UserDetailsComponent],
})
export class SignupModule {}
