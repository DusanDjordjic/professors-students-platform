export class ContactInfoDetails {
  email: string;
  phoneNumber: string;
  website: string;

  constructor(obj?: any) {
    this.email = (obj && obj.email) || null;
    this.phoneNumber = (obj && obj.phoneNumber) || null;
    this.website = (obj && obj.website) || null;
  }
}
