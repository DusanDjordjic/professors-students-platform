import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navContentVisible: boolean = false;
  loginStatus = false;
  subscriptions: Subscription = new Subscription();
  sidebarState: boolean = false;
  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService
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
        console.log(sidebarState);
      })
    );
    this.subscriptions.add(
      this.authService.loginStatus$.subscribe((loginStatus) => {
        this.loginStatus = loginStatus;
        console.log('loginStatus', loginStatus);
      })
    );
    this.subscriptions.add(
      this.authService.currentUserType$.subscribe((userType) => {
        console.log('userType', userType);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  toggleNavContent() {
    this.navContentVisible = !this.navContentVisible;
  }
  logout() {
    this.authService.logout();
  }
}
