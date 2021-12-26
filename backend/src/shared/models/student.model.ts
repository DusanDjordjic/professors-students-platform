export class StudentModel {
  _id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  interests: string;
  password: string;
  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.firstName = (obj && obj.firstName) || '';
    this.lastName = (obj && obj.lastName) || '';
    this.username = (obj && obj.username) || '';
    this.email = (obj && obj.email) || '';
    this.phoneNumber = (obj && obj.phoneNumber) || '';
    this.interests =
      (obj && obj.interests && JSON.stringify(obj.interests)) || '';
    this.password = (obj && obj.password) || '';
  }
}
