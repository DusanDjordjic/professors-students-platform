import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { SimpleUser } from 'src/shared/models/simple-user.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarState: boolean = false;
  loginStatus: boolean = false;
  subscriptions = new Subscription();
  user: SimpleUser = new SimpleUser();
  constructor(
    private sidebarSerice: SidebarService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.sidebarSerice.sidebarState$.subscribe((sidebarState) => {
        this.sidebarState = sidebarState;
      })
    );
    this.subscriptions.add(
      this.authService.loginStatus$.subscribe((loginStatus) => {
        this.loginStatus = loginStatus;
        if (loginStatus) {
          this.profileService.getUserDetails('simple').subscribe((data) => {
            this.user = new SimpleUser(data);
          });
        }
      })
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
