import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { LoginDataModel } from './models/login-data.model';
import { LoginResponseModel } from './models/login-response.model';

import { UserType } from '../../shared/types/user.type';
import { SignupUser } from './models/signup-user.model';

const baseUrl = 'http://localhost:3000/api/auth';

@Injectable()
export class AuthService {
  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loginStatus$: Observable<boolean> = this.loginStatus.asObservable();

  private currentUserType: BehaviorSubject<UserType> =
    new BehaviorSubject<UserType>(null);
  currentUserType$: Observable<UserType> = this.currentUserType.asObservable();
  constructor(private http: HttpClient) {
    this.loginStatus.next(this.isLoggenIn());
    this.currentUserType.next(this.getCurrentUserType());
  }
  signupUser(userData: SignupUser) {
    const subjects = userData.subjects.map((sub) => sub.id);
    return this.http.post(`${baseUrl}/signup`, { ...userData, subjects });
  }
  loginStudent(logindata: LoginDataModel): Observable<LoginResponseModel> {
    return this.http
      .post(`${baseUrl}/login/student`, logindata)
      .pipe(map((response: any) => new LoginResponseModel(response)));
  }
  loginProfessor(logindata: LoginDataModel): Observable<LoginResponseModel> {
    return this.http
      .post(`${baseUrl}/login/professor`, logindata)
      .pipe(map((response: any) => new LoginResponseModel(response)));
  }

  login(loginData: LoginResponseModel) {
    this.loginStatus.next(true);
    this.currentUserType.next(loginData.type);
    if (loginData.type) localStorage.setItem('currentUserType', loginData.type);
    localStorage.setItem('accessToken', loginData.accessToken);
    localStorage.setItem('expiresAt', loginData.expiresAt.toString());
  }
  logout() {
    this.loginStatus.next(false);
    this.currentUserType.next(null);
    localStorage.removeItem('currentUserType');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
  }
  getCurrentUserType(): UserType {
    const currentUserType = localStorage.getItem('currentUserType');
    if (currentUserType == 'student' || currentUserType == 'professor') {
      return currentUserType;
    }
    return null;
  }
  isLoggenIn() {
    const expired =
      Number(localStorage.getItem('expiresAt')) > new Date().getTime();
    const currentUserType = localStorage.getItem('currentUserType');
    if (expired && currentUserType) return true;
    return false;
  }
  isLoggedOut() {
    return !this.isLoggenIn();
  }
  getExpiration() {
    const expiresAt = Number(localStorage.getItem('expiresAt'));
    return expiresAt;
  }
}
