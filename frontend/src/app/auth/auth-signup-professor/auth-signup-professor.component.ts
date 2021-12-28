import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LearningWayModel } from 'src/shared/models/learning-way.model';
import { SubjectModel } from 'src/shared/models/subject.model';
import { LearningWayService } from 'src/shared/providers/learning-way.service';
import { SubjectsService } from 'src/shared/providers/subjects.service';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { AuthService } from '../auth.service';

import { SignupProfessorModel } from '../models/signup-professor.model';

@Component({
  selector: 'app-auth-signup-student',
  templateUrl: './auth-signup-professor.component.html',
  styleUrls: ['./auth-signup-professor.component.scss'],
})
export class AuthSignupProfessorComponent implements OnInit {
  // Selektovani niz interesovanja
  selectedSubjects: SubjectModel[] = [];
  learningWays: LearningWayModel[] = [];
  // Niz svih predmeta
  subjects: SubjectModel[] = [];
  AllLearningWays: LearningWayModel[] = [];
  // Za greške koje se mogu javiti prilikom submit-ovanja
  afterSubmitErrors: string[] = [];
  afterSubmitErrorStatusCode: number = -1;
  internalErrors: string[] = [];
  // Boolean da bi smo znali kada da prikažemo greške kod selektovanja interesovanja
  subjectsTouched = false;
  learingWayTouched = false;
  // Boolean za spiner
  isLoading = false;
  // 3 Polja na koja cemo se fokusirati u slucaju greske
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
      street: new FormControl(null),
      streetNumber: new FormControl(null),
      price: new FormControl(1000, [Validators.required, Validators.min(0)]),
      subjects: new FormArray([], [Validators.required]),
      learningWays: new FormArray([], [Validators.required]),
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
    private learningWayService: LearningWayService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Uzimamo sve predmete sa servera
    this.subjectService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (err) => {
        // TODO Modal da iskoci ako su se desile greske koje nisu do korisnika
        this.internalErrors.push(
          'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
        );
      },
    });
    // Uzimamo sve nacine ucenja
    this.learningWayService.getAllLearningWays().subscribe({
      next: (learningWays) => {
        this.AllLearningWays = learningWays;
      },
      error: (err) => {
        // TODO Modal da iskoci ako su se desile greske koje nisu do korisnika
        this.internalErrors.push(
          'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
        );
      },
    });
  }
  // Getter za niz interesovanja
  get formSubjects() {
    return this, this.signupForm.get('subjects') as FormArray;
  }
  // Getter za niz nacina ucenja
  get formLearningWays() {
    return this, this.signupForm.get('learningWays') as FormArray;
  }
  // Metoda za dobijanja kontrole
  getFormControl(name: string) {
    return this.signupForm.get(name) as FormControl;
  }

  // Metoda koja se poziva na submit
  onSubmit() {
    // Ako se nekako klinke forma dok nije validna ne treba ništa da se desi
    if (this.signupForm.invalid) return;

    // Uključujemo spiner
    this.isLoading = true;

    // Pravimo nog studenta od podataka iz forme
    const newProfessor = new SignupProfessorModel(this.signupForm.value);

    // Http zahtev za slanje studenta
    this.authService.signupProfessor(newProfessor).subscribe({
      next: (data) => {
        // Ako se prođe kako treba gasimo spiner i postavljamo greske na prazan niz
        this.isLoading = false;
        this.afterSubmitErrors = [];
      },
      error: (err) => {
        console.log(err);
        // Cuvamo status code greške
        this.afterSubmitErrorStatusCode = err.error.status;
        // Ako je status code greske 409 (Conflict)
        // Znači da je email, broj telefona ili username postoje
        if (err && err.error && err.error.status == 409) {
          // Na koje polje ćemo se fokusirti
          let filedToFocus: string = '';
          // Mapiramo poruke greške u niz grešaka
          this.afterSubmitErrors = err.error.response.map(
            (err: { field: string; message: string }) => {
              // Postaviti focus na prvo polje na koje se naiđe
              if (filedToFocus == '') filedToFocus = err.field;
              return err.message;
            }
          );
          // Fokusirati se na polje
          this.focusOnField(filedToFocus);
        } else if (err && err.error && err.error.status == 500) {
          // Ako je status code 500 znači da je došlo do greške na serveru
          this.afterSubmitErrors = err.error.response.map(
            (err: { field: string; message: string }) => err.message
          );
        } else {
          // Ako se desila nepredviđena greška
          // TODO Modal da iskoci ako su se desile greske koje nisu do korisnika
          this.internalErrors.push(
            'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
          );
        }

        this.isLoading = false;
      },
    });
  }

  // Fokusiranje na polje
  focusOnField(fieldName: string) {
    if (fieldName == 'email') {
      // (this.emailField.nativeElement as HTMLElement).scrollIntoView();
      this.emailField.nativeElement.focus();
    }
    if (fieldName == 'phoneNumber') {
      // (this.phoneNumberField.nativeElement as HTMLElement).scrollIntoView();
      this.phoneNumberField.nativeElement.focus();
    }
    if (fieldName == 'username') {
      // (this.usernameField.nativeElement as HTMLElement).scrollIntoView();
      this.usernameField.nativeElement.focus();
    }
  }

  // Dodajemo predmet u niz predmeta
  addSubjectToArray(_id: number) {
    // Postavljamo na true zato što je pipnuto dugme
    this.subjectsTouched = true;
    // Tražimo predmet koji ima isti id
    const sub = this.subjects.find((subject) => subject._id == _id);
    // Ako uposte ne postoji predmet sa tim id-jem samo se vraćamo
    if (!sub) return;
    // Provera da li je predmet već dodan u niz. Ako jeste samo se vratimo
    if (this.selectedSubjects.includes(sub)) return;

    // Dodajemo predmet u niz za prikaz i u FormArray
    this.selectedSubjects.push(sub);
    this.formSubjects.push(new FormControl(_id));
  }

  removeSubjectFromArray(_id: number) {
    // Niz za prikaz filtriramo samo
    this.selectedSubjects = this.selectedSubjects.filter(
      (sub) => sub._id !== _id
    );
    // Za FormArray moramo da prvo pronađemo indeks pa da obrišemo sa tog indeksa
    this.formSubjects.removeAt(
      this.formSubjects.value.findIndex(
        (subjectId: number) => subjectId === _id
      )
    );
  }
  addLearingWayToArray(_id: number) {
    // Postavljamo na true zato što je pipnuto dugme
    this.learingWayTouched = true;
    // Tražimo način učenja koji ima isti id
    const learingWay = this.AllLearningWays.find(
      (learingWay) => learingWay._id == _id
    );
    // Ako uposte ne postoji način učenja sa tim id-jem samo se vraćamo
    if (!learingWay) return;
    // Provera da li je način učenja već dodan u niz. Ako jeste samo se vratimo
    if (this.learningWays.includes(learingWay)) return;

    // Dodajemo način učenja u niz za prikaz i u FormArray
    this.learningWays.push(learingWay);
    this.formLearningWays.push(new FormControl(_id));
  }

  removeLearningWayFromArray(_id: number) {
    // Niz za prikaz filtriramo samo
    this.learningWays = this.learningWays.filter((sub) => sub._id !== _id);
    // Za FormArray moramo da prvo pronađemo indeks pa da obrišemo sa tog indeksa
    this.formLearningWays.removeAt(
      this.formLearningWays.value.findIndex(
        (learningWay: number) => learningWay === _id
      )
    );
  }
}
