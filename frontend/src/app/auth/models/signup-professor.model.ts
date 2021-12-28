export class SignupProfessorModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: string;
  subjects: string;
  learningWays: string;
  price: number;
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
    this.subjects = (obj && obj.subjects && JSON.stringify(obj.subjects)) || '';
    this.learningWays =
      (obj && obj.learningWays && JSON.stringify(obj.learningWays)) || '';
    this.price = (obj && obj.price > 0 && obj.price) || 0;
    this.username = (obj && obj.username) || '';
    this.password = (obj && obj.password) || '';
  }
}
