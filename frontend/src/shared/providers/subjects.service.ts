import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SubjectModel } from '../models/subject.model';

const baseUrl = 'http://localhost:3000/api/subjects';

@Injectable()
export class SubjectsService {
  constructor(private http: HttpClient) {}
  getAllSubjects(): Observable<SubjectModel[]> {
    return this.http.get(baseUrl).pipe(
      map((subjects: any) => {
        return subjects.map((subject: any) => new SubjectModel(subject));
      })
    );
  }
}
