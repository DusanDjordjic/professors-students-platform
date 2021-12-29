import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navContentVisible: boolean = false;
  loginStatus = false;
  subscriptions: Subscription = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
