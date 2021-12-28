import { Component, OnInit } from '@angular/core';
import { SubjectModel } from 'src/shared/models/subject.model';
import { SubjectsService } from 'src/shared/providers/subjects.service';

@Component({
  selector: 'app-auth-signup-student',
  templateUrl: './auth-signup-student.component.html',
  styleUrls: ['./auth-signup-student.component.scss'],
})
export class AuthSignupStudentComponent implements OnInit {
  interests: SubjectModel[] = [];
  subjects: SubjectModel[] = [];
  constructor(private subjectService: SubjectsService) {}

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }
  addInterest(_id: number) {
    const sub = this.subjects.find((subject) => subject._id == _id);
    if (!sub) return;
    if (this.interests.includes(sub)) return;
    this.interests.push(sub);
  }
  removeInterest(_id: number) {
    this.interests = this.interests.filter((sub) => sub._id !== _id);
  }
}
