import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/shared/components/loading-spinner/loading-spinner.component';

import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ProfileModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
