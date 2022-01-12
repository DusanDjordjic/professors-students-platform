import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

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
    private authService: AuthService,
    private router: Router,
    private signupSubjectsService: SignupSubjectsService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.signupService.userDetails;
    this.signupSubjectsService.getAllSubjects().subscribe((allSubjects) => {
      const subjectIds = this.userDetails.subjects.map((sub) => sub.id);
      this.selectedSubjects = allSubjects.filter((sub) =>
        subjectIds.includes(sub.id)
      );
    });
  }
  onSubmit() {
    this.authService.signupUser(this.userDetails).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
