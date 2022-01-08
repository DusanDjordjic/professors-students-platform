import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from 'src/shared/types/user.type';

const baseUrl = 'http://localhost:3000/api/user';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}
  getUserDetails(type: UserType) {
    return this.http.get(baseUrl, {
      params: {
        type: type || '',
      },
    });
  }
}
