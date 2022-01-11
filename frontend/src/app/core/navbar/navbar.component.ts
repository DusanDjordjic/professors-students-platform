import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { SimpleUser } from 'src/shared/models/simple-user.model';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginStatus = false;
  subscriptions: Subscription = new Subscription();
  sidebarState: boolean = false;
  user: SimpleUser = new SimpleUser();
  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private profileService: ProfileService
  ) {}
  toggleSidebar() {
    if (this.sidebarState) {
      this.sidebarService.hideSidebar();
    } else {
      this.sidebarService.showSidebar();
    }
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.sidebarService.sidebarState$.subscribe((sidebarState) => {
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
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
