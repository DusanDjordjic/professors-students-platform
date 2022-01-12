import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { LoginDataModel } from './models/login-data.model';
import { LoginResponseModel } from './models/login-response.model';

import { SignupUser } from './models/signup-user.model';

const baseUrl = 'http://localhost:3000/api/auth';

@Injectable()
export class AuthService {
  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loginStatus$: Observable<boolean> = this.loginStatus.asObservable();

  constructor(private http: HttpClient) {
    this.loginStatus.next(this.isLoggedIn());
  }
  signupUser(userData: SignupUser) {
    const subjects = userData.subjects.map((sub) => sub.id);
    return this.http.post(`${baseUrl}/signup`, { ...userData, subjects });
  }
  saveUserData(userData: LoginResponseModel) {
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('expiresAt', userData.expiresAt.toString());
    this.loginStatus.next(true);
  }

  login(loginData: LoginDataModel): Observable<LoginResponseModel> {
    return this.http
      .post(`${baseUrl}/login`, loginData)
      .pipe(map((response: any) => new LoginResponseModel(response)));
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }

  isLoggedIn() {
    const notExpired =
      Number(localStorage.getItem('expiresAt')) > new Date().getTime();

    if (notExpired) return true;
    return false;
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiresAt = Number(localStorage.getItem('expiresAt'));
    return expiresAt;
  }
  getUsersUsername() {
    return localStorage.getItem('username') || '';
  }
}
