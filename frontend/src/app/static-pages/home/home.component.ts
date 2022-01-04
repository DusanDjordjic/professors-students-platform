import { Component, OnInit } from '@angular/core';
export enum LearnMoreTabs {
  US,
  SITE,
  GOAL,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  learnMoreTabs = LearnMoreTabs;
  learnMoreActiveTab: LearnMoreTabs = LearnMoreTabs.US;
  constructor() {}

  ngOnInit(): void {}
  changeLearnTab(newTab: LearnMoreTabs) {
    this.learnMoreActiveTab = newTab;
  }
}
