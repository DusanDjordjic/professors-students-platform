import { UserType } from '../types/user.type';

export class LoginResponseModel {
  accessToken: string;
  expiresAt: number;
  type: UserType;
  constructor(obj?: any) {
    this.accessToken = (obj && obj.accessToken) || '';
    this.expiresAt = (obj && obj.expiresAt) || 0;
    this.type = (obj && obj.type) || null;
  }
}
