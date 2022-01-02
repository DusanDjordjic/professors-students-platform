import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginDataModel } from '../models/login-data.model';

@Component({
  selector: 'app-auth-login-student',
  templateUrl: './auth-login-student.component.html',
  styleUrls: ['./auth-login-student.component.scss'],
})
export class AuthLoginStudentComponent implements OnInit {
  afterSubmitErrors: string[] = [];
  afterSubmitErrorStatusCode: number = -1;
  // 2 Polja na koja cemo se fokusirati u slucaju greske
  @ViewChild('usernameField') usernameField!: ElementRef;
  @ViewChild('passwordField') passwordField!: ElementRef;

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  isLoading = false;
  internalErrors: string[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    // Uključujemo spiner
    this.isLoading = true;
    // Pravimo nov loginData model iz forme
    const newLoginData = new LoginDataModel(this.loginForm.value);

    this.authService.loginStudent(newLoginData).subscribe({
      next: (response) => {
        // Brisemo greske iz niza
        this.afterSubmitErrors = [];
        // Gasimo spiner
        this.isLoading = false;
        this.authService.login(response);
      },
      error: (err) => {
        console.log(err);
        // Brisemo greske iz niza
        this.afterSubmitErrors = [];
        // Ako ne postoji err.error znaci da je greska na serveru
        if (!(err && err.error)) {
          if (this.internalErrors.length == 0)
            this.internalErrors.push(
              'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
            );
          return;
        }
        this.afterSubmitErrorStatusCode = err.error.status;
        let filedToFocus: string = '';
        // Ako je status code 403 znaci da sifra nije dobra
        if (err && err.error && err.error.status == 403) {
          // Na koje polje ćemo se fokusirti
          filedToFocus = 'password';
          console.log({ filedToFocus });
          // Dodajemo gresku u niz gresaka
          this.afterSubmitErrors.push(err.error.response);
          // Fokusirati se na polje
          this.focusOnField(filedToFocus);
        } else if (err && err.error && err.error.status == 404) {
          // Ako je status code 404 znači da je username ne postoji
          filedToFocus = 'username';
          console.log({ filedToFocus });
          // Dodajemo gresku u niz gresaka
          this.afterSubmitErrors.push(err.error.response);
          // Fokusirati se na polje
          this.focusOnField(filedToFocus);
        } else if (err && err.error && err.error.status == 500) {
          // Ako je status code 500 znači da je došlo do greške na serveru
          if (this.internalErrors.length == 0)
            this.internalErrors.push(
              'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
            );
        } else {
          // Ako se desila nepredviđena greška
          // TODO Modal da iskoci ako su se desile greske koje nisu do korisnika
          if (this.internalErrors.length == 0)
            this.internalErrors.push(
              'Došlo je do greške. Server je u kvaru. Pokušajte opet kasnije'
            );
        }
        // Gasimo spiner
        this.isLoading = false;
      },
    });
  }
  focusOnField(fieldName: string) {
    if (fieldName == 'password') {
      this.passwordField.nativeElement.focus();
    }
    if (fieldName == 'username') {
      this.usernameField.nativeElement.focus();
    }
  }
  // Metoda za dobijanja kontrole
  getFormControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
}
