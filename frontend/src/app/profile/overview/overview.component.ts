import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FullUser } from 'src/shared/models/full-user.mode';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  isOwner: boolean = false;
  user: FullUser = new FullUser();
  constructor(
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.username == this.authService.getUsersUsername()) {
        this.isOwner = true;
        this.profileService
          .getOwnerDetails('full')
          .pipe(
            first(),
            map((data) => new FullUser(data))
          )
          .subscribe((data) => {
            this.user = data;
          });
      } else {
        this.profileService
          .getUsersDetails(params.username as string, 'full')
          .pipe(
            first(),
            map((data) => new FullUser(data))
          )
          .subscribe((data) => {
            this.user = data;
          });
      }
    });
  }
}
