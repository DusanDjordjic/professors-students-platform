export class SignupStudentModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: string;
  interests: string;
  learningWays: string;
  username: string;
  password: string;
  constructor(obj?: any) {
    this.firstName = (obj && obj.firstName) || '';
    this.lastName = (obj && obj.lastName) || '';
    this.email = (obj && obj.email) || '';
    this.phoneNumber = (obj && obj.phoneNumber) || '';
    this.city = (obj && obj.city) || '';
    this.street = (obj && obj.street) || null;
    this.streetNumber = (obj && obj.streetNumber) || null;
    this.interests =
      (obj && obj.interests && JSON.stringify(obj.interests)) || '';
    this.learningWays =
      (obj && obj.learningWays && JSON.stringify(obj.learningWays)) || '';
    this.username = (obj && obj.username) || '';
    this.password = (obj && obj.password) || '';
  }
}
