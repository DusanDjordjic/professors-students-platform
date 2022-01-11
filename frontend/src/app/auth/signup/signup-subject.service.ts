import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GroupModel } from './models/group.model';
import { SubjectModel } from './models/subject.model';

const subjectsUrl = 'http://localhost:3000/api/subjects';
@Injectable()
export class SignupSubjectsService {
  constructor(private http: HttpClient) {}
  getSubjectByGroup(
    groups: { id: number; active: boolean }[] = []
  ): Observable<SubjectModel[]> {
    let activeGroups = groups
      .filter((group) => group.active)
      .map((group) => group.id);
    return this.http
      .get(`${subjectsUrl}`, {
        params: new HttpParams().set(
          'groups',
          activeGroups.length > 0 ? JSON.stringify(activeGroups) : '[]'
        ),
      })
      .pipe(
        map((subjects: any) =>
          subjects.map((sub: any) => new SubjectModel(sub))
        )
      );
  }
  getAllSubjects(): Observable<SubjectModel[]> {
    return this.http
      .get(`${subjectsUrl}/all`)
      .pipe(
        map((subjects: any) =>
          subjects.map((sub: any) => new SubjectModel(sub))
        )
      );
  }
  getAllGroups(): Observable<GroupModel[]> {
    return this.http
      .get(`${subjectsUrl}/groups`)
      .pipe(
        map((groups: any) => groups.map((group: any) => new GroupModel(group)))
      );
  }
}
