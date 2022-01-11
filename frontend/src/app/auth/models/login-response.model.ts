export class LoginResponseModel {
  accessToken: string;
  expiresAt: number;
  username: string;
  constructor(obj?: any) {
    this.accessToken = (obj && obj.accessToken) || '';
    this.expiresAt = (obj && obj.expiresAt) || 0;
    this.username = (obj && obj.username) || '';
  }
}
