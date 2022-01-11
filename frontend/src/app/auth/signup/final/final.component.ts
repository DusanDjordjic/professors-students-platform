import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SignupUser } from '../../models/signup-user.model';
import { SubjectModel } from '../models/subject.model';
import { SignupSubjectsService } from '../signup-subject.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss'],
})
export class FinalComponent implements OnInit {
  userDetails: SignupUser = new SignupUser();
  selectedSubjects: SubjectModel[] = [];
  constructor(
    private signupService: SignupService,
    private router: Router,
    private signupSubjectsService: SignupSubjectsService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.signupService.userDetails;
    this.signupSubjectsService.getAllSubjects().subscribe((allSubjects) => {
      console.log(this.userDetails.subjects);
      const subjectIds = this.userDetails.subjects.map((sub) => sub.id);
      this.selectedSubjects = allSubjects.filter((sub) =>
        subjectIds.includes(sub.id)
      );
    });
  }
  onSubmit() {}
}
