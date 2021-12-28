import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SubjectModel } from 'src/shared/models/subject.model';
import { SubjectsService } from 'src/shared/providers/subjects.service';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { AuthService } from '../auth.service';
import { SignupStudentModel } from '../models/signup-student.model';

@Component({
  selector: 'app-auth-signup-student',
  templateUrl: './auth-signup-student.component.html',
  styleUrls: ['./auth-signup-student.component.scss'],
})
export class AuthSignupStudentComponent implements OnInit {
  interests: SubjectModel[] = [];
  subjects: SubjectModel[] = [];
  afterSubmitErrors: string[] = [];
  interestsTouched = false;
  isLoading = false;
  @ViewChild('usernameField') usernameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('phoneNumberField') phoneNumberField!: ElementRef;
  signupForm = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      streetNumber: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required]),
      interests: new FormArray([], [Validators.required]),
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[A-Za-z])(?=.*[0123456789])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}'
        ),
      ]),
      passwordRepeat: new FormControl(null, [Validators.required]),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(
    private subjectService: SubjectsService,
    private authService: AuthService
  ) {}

  get formInterests() {
    return this, this.signupForm.get('interests') as FormArray;
  }
  getFormControl(name: string) {
    return this.signupForm.get(name) as FormControl;
  }
  onSubmit() {
    this.interestsTouched = true;

    if (this.signupForm.invalid) return;
    this.isLoading = true;
    const newStudent = new SignupStudentModel(this.signupForm.value);

    this.authService.signupStudent(newStudent).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.afterSubmitErrors = [];
      },
      (err) => {
        let filedToFocus: string = '';
        this.afterSubmitErrors = err.error.response.map(
          (err: { field: string; message: string }) => {
            if (filedToFocus == '') filedToFocus = err.field;
            return err.message;
          }
        );
        this.focusOnField(filedToFocus);
        this.isLoading = false;
      }
    );
  }
  focusOnField(fieldName: string) {
    if (fieldName == 'email') this.emailField.nativeElement.focus();
    if (fieldName == 'phoneNumber') this.phoneNumberField.nativeElement.focus();
    if (fieldName == 'username') this.usernameField.nativeElement.focus();
  }
  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }
  addSubjectToArray(_id: number) {
    this.interestsTouched = true;
    const sub = this.subjects.find((subject) => subject._id == _id);
    if (!sub) return;
    if (this.interests.includes(sub)) return;
    this.interests.push(sub);

    this.formInterests.push(new FormControl(_id));
    console.log(this.formInterests.value);
  }

  removeSubjectFromArray(_id: number) {
    this.interests = this.interests.filter((sub) => sub._id !== _id);
    this.formInterests.removeAt(
      this.formInterests.value.findIndex(
        (subjectId: number) => subjectId === _id
      )
    );
    console.log(this.formInterests.value);
  }
  convertToFormControl(subject: AbstractControl) {
    return subject as FormControl;
  }
  getSubjectName(_id: number) {
    return this.subjects.find((subject) => subject._id == _id)?.name;
  }
}
