import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginDataModel } from './models/login-data.model';
import { LoginResponseModel } from './models/login-response.model';
import { SignupProfessorModel } from './models/signup-professor.model';
import { SignupStudentModel } from './models/signup-student.model';
import { UserType } from './types/user.type';

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
  }

  signupStudent(newStudent: SignupStudentModel): Observable<any> {
    return this.http.post(`${baseUrl}/signup/student`, newStudent);
  }
  signupProfessor(newProfessor: SignupProfessorModel): Observable<any> {
    return this.http.post(`${baseUrl}/signup/professor`, newProfessor);
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
    localStorage.setItem('accessToken', loginData.accessToken);
    localStorage.setItem('expiresAt', loginData.expiresAt.toString());
  }
  logout() {
    this.loginStatus.next(false);
    this.currentUserType.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
  }

  isLoggenIn() {
    return Number(localStorage.getItem('expiresAt')) > new Date().getTime();
  }
  isLoggedOut() {
    return !this.isLoggenIn();
  }
  getExpiration() {
    const expiresAt = Number(localStorage.getItem('expiresAt'));
    return expiresAt;
  }
}
