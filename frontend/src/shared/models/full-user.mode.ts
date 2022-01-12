import { UserType } from '../types/user.type';

export class FullUser {
  username: string;
  firstname: string;
  lastname: string;
  type: UserType;
  about: string;
  constructor(obj?: any) {
    this.username = (obj && obj.username) || '';
    this.firstname = (obj && obj.firstname) || '';
    this.lastname = (obj && obj.lastname) || '';
    this.type = (obj && obj.type) || 'student';
    this.about = (obj && obj.about) || '';
  }
}
