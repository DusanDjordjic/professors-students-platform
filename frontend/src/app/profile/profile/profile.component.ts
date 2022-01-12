import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SimpleUser } from 'src/shared/models/simple-user.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  isOwner: boolean = false;
  isProfessor: boolean = false;
  simpleUserData: SimpleUser = new SimpleUser();
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.username == this.authService.getUsersUsername()) {
        this.isOwner = true;
        this.profileService
          .getOwnerDetails('simple')
          .pipe(first())
          .subscribe({
            next: (data) => {
              this.simpleUserData = new SimpleUser(data);
              this.isProfessor = this.simpleUserData.type == 'professor';
            },
            error: (err) => {
              console.log(err);
              this.router.navigate(['/']);
            },
          });
      } else {
        this.profileService
          .getUsersDetails(params.username, 'simple')
          .pipe(first())
          .subscribe({
            next: (data) => {
              this.simpleUserData = new SimpleUser(data);
              this.isProfessor = this.simpleUserData.type == 'professor';
            },
            error: (err) => {
              console.log(err);
              this.router.navigate(['/']);
            },
          });
      }
    });
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
