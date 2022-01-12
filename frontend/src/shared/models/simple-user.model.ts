import { UserType } from '../types/user.type';

export class SimpleUser {
  username: string;
  firstname: string;
  lastname: string;
  type: UserType;
  constructor(obj?: any) {
    this.username = (obj && obj.username) || '';
    this.firstname = (obj && obj.firstname) || '';
    this.lastname = (obj && obj.lastname) || '';
    this.type = (obj && obj.lastname) || 'student';
  }
}
