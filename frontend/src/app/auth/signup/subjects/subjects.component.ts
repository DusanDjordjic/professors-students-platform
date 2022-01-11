import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupAddressDetails } from '../../models/signup-address-details.model';
import { SignupSubjectDetails } from '../../models/signup-subject.model';
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
  isEdit: boolean = false;
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
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      const subjectIds = this.signupService.userDetails.subjects.map(
        (sub) => sub.id
      );

      this.signupSubjectService.getAllSubjects().subscribe((allSubjects) => {
        this.selectedSubjects = allSubjects.filter((sub) =>
          subjectIds.includes(sub.id)
        );
      });
    }
    this.getAllGroups();
  }
  getSubjectByGroup(groups?: { id: number; active: boolean }[]) {
    this.signupSubjectService.getSubjectByGroup(groups).subscribe({
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
          this.getSubjectByGroup(this.activeGroups);
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
    this.getSubjectByGroup(this.activeGroups);
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
    this.getSubjectByGroup(this.activeGroups);
  }
  onSubmit() {
    if (this.selectedSubjects.length == 0) return;
    const subjects = this.selectedSubjects.map(
      (sub) => new SignupSubjectDetails(sub)
    );
    this.signupService.updateSubjects(subjects);
    if (this.isEdit) {
      this.router.navigate(['/auth', 'signup', 'final']);
    } else {
      this.router.navigate(['/auth', 'signup', 'about']);
    }
  }
}
