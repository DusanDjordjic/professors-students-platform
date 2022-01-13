export class ContactInfo {
  email: string;
  phoneNumber: string | null;
  website: string | null;
  constructor(obj?: any) {
    this.email = (obj && obj.email) || '';
    this.phoneNumber = (obj && obj.phoneNumber) || null;
    this.website = (obj && obj.website) || null;
  }
}
