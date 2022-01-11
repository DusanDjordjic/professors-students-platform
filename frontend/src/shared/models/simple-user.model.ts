export class SimpleUser {
  username: string;
  firstname: string;
  lastname: string;
  constructor(obj?: any) {
    this.username = (obj && obj.username) || '';
    this.firstname = (obj && obj.firstname) || '';
    this.lastname = (obj && obj.lastname) || '';
  }
}
