import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarService {
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  showSidebar() {
    this.sidebarState.next(true);
  }
  hideSidebar() {
    this.sidebarState.next(false);
  }
}
