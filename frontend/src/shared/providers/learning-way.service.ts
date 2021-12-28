import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LearningWayModel } from '../models/learning-way.model';

const baseUrl = 'http://localhost:3000/api/learningways';

@Injectable()
export class LearningWayService {
  constructor(private http: HttpClient) {}
  getAllLearningWays(): Observable<LearningWayModel[]> {
    return this.http.get(baseUrl).pipe(
      map((learingWays: any) => {
        return learingWays.map(
          (learingWay: any) => new LearningWayModel(learingWay)
        );
      })
    );
  }
}
