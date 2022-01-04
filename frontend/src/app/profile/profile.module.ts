import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ProfileService],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule {}
