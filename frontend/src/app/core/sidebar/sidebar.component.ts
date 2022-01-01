import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarState: boolean = false;
  constructor(private sidebarSerice: SidebarService) {}

  ngOnInit(): void {
    this.sidebarSerice.sidebarState$.subscribe((sidebarState) => {
      this.sidebarState = sidebarState;
    });
  }
}
