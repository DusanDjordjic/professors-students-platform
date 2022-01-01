import { Component, OnInit } from '@angular/core';
import { SidebarService } from './core/sidebar/sidebar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sidebarState: boolean = false;
  constructor(private sidebarService: SidebarService) {}
  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((sidebarState) => {
      this.sidebarState = sidebarState;
    });
  }
}
