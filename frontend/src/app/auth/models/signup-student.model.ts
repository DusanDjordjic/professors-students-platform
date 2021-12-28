export class SignupStudentModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  interests: string;
  username: string;
  password: string;
  constructor(obj?: any) {
    this.firstName = (obj && obj.firstName) || '';
    this.lastName = (obj && obj.lastName) || '';
    this.email = (obj && obj.email) || '';
    this.phoneNumber = (obj && obj.phoneNumber) || '';
    this.city = (obj && obj.city) || '';
    this.street = (obj && obj.street) || '';
    this.streetNumber = (obj && obj.streetNumber) || '';
    this.zipCode = (obj && obj.zipCode) || '';
    this.interests =
      (obj && obj.interests && JSON.stringify(obj.interests)) || '';
    this.username = (obj && obj.username) || '';
    this.password = (obj && obj.password) || '';
  }
}
