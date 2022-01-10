import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupAddressDetails } from '../../models/signup-address-details.model';
import { GroupModel } from '../models/group.model';
import { SubjectModel } from '../models/subject.model';
import { SignupSubjectsService } from '../signup-subject.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  subjects: SubjectModel[] = [];
  groups: GroupModel[] = [];
  areAllSelected: boolean = true;
  selectedSubjects: SubjectModel[] = [];
  activeGroups: { id: number; active: boolean }[] = [];
  setup: boolean = true;

  constructor(
    private signupService: SignupService,
    private signupSubjectService: SignupSubjectsService,
    private router: Router
  ) {}
  selectSubject(subjectId: number) {
    const clickedSubject = this.subjects.find((sub) => sub.id == subjectId);

    if (clickedSubject) {
      let included = false;
      let existsingSubjectIndex = -1;
      this.selectedSubjects.forEach((subject, index) => {
        if (subject.id == clickedSubject.id) {
          included = true;
          existsingSubjectIndex = index;
        }
      });

      if (included) {
        this.selectedSubjects.splice(existsingSubjectIndex, 1);
      } else {
        this.selectedSubjects.push(clickedSubject);
      }
      console.log(this.selectedSubjects);
    }
  }
  existsInSelected(subjectId: number) {
    return this.selectedSubjects.some((subject) => subject.id == subjectId);
  }
  removeSubject(subjectId: number) {
    this.selectedSubjects = this.selectedSubjects.filter(
      (sub) => sub.id !== subjectId
    );
  }

  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllSubjects(groups?: { id: number; active: boolean }[]) {
    this.signupSubjectService.getAllSubjects(groups).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
    });
  }
  getAllGroups() {
    this.signupSubjectService.getAllGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.activeGroups = groups.map((group) => ({
          id: group.id,
          active: true,
        }));
        if (this.setup) {
          this.getAllSubjects(this.activeGroups);
          this.setup = false;
        }
      },
    });
  }

  changeGroupState(id: number) {
    let areAllSelected = true;
    this.activeGroups.forEach((group) => {
      if (group.id == id) group.active = !group.active;
      if (group.active == false) areAllSelected = false;
    });
    this.areAllSelected = areAllSelected;
    this.getAllSubjects(this.activeGroups);
  }
  isGroupActive(id: number) {
    let active: boolean = true;
    this.activeGroups.forEach((group) => {
      if (group.id == id) active = group.active;
    });
    return active;
  }

  AllSelectedClick() {
    if (this.areAllSelected) {
      // true
      this.activeGroups.forEach((group) => {
        group.active = false;
      });
      this.areAllSelected = false;
    } else {
      // false
      this.activeGroups.forEach((group) => {
        group.active = true;
      });
      this.areAllSelected = true;
    }
    this.getAllSubjects(this.activeGroups);
  }
  onSubmit() {
    console.log(this.selectedSubjects);
  }
}
