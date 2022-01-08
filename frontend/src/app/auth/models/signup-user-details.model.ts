import { UserType } from 'src/shared/types/user.type';

export class SignupUserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: UserType;
  constructor(obj?: any) {
    this.firstname = (obj && obj.firstname) || null;
    this.lastname = (obj && obj.lastname) || null;
    this.username = (obj && obj.username) || null;
    this.password = (obj && obj.password) || null;
    this.type = (obj && obj.type) || null;
  }
}
