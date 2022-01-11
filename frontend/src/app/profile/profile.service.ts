import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestShapeType } from 'src/shared/types/request-shape.type';

const baseUrl = 'http://localhost:3000/api/users';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}
  getUserDetails(shape: RequestShapeType) {
    return this.http.get(`${baseUrl}/profile`, {
      params: new HttpParams().set('shape', shape),
    });
  }
}
