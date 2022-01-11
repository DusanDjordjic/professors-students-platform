import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginDataModel } from '../models/login-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  getFormControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // Pravimo loginDataModel
    const loginData = new LoginDataModel(this.loginForm.value);
    this.authService.login(loginData).subscribe({
      next: (data) => {
        console.log(data);
        console.log('LOGIN SUCCESS');
        this.authService.saveUserData(data);
        console.log('a');

        this.router.navigate(['/profile', data.username]);
      },
      error: (err) => {
        console.log(err);
        console.log('LOGIN FAIL');
      },
    });
    // Proveravamo za svaki slucaj da li su podaci tacni
  }
}
