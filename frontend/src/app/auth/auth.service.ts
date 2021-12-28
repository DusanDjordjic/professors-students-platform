import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupProfessorModel } from './models/signup-professor.model';
import { SignupStudentModel } from './models/signup-student.model';

const baseUrl = 'http://localhost:3000/api/auth';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  signupStudent(newStudent: SignupStudentModel): Observable<any> {
    return this.http.post(`${baseUrl}/signup/student`, newStudent);
  }
  signupProfessor(newProfessor: SignupProfessorModel): Observable<any> {
    return this.http.post(`${baseUrl}/signup/professor`, newProfessor);
  }
}
