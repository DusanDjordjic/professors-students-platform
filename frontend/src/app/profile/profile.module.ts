import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile/profile.component';

import { OverviewComponent } from './overview/overview.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [ProfileService],
  declarations: [ProfileComponent, OverviewComponent, EditComponent],
})
export class ProfileModule {}
