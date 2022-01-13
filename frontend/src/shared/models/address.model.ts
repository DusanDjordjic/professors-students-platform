export class Address {
  city: string;
  street: string | null;
  streetNumber: string | null;
  constructor(obj?: any) {
    this.city = (obj && obj.city) || '';
    this.street = (obj && obj.street) || null;
    this.streetNumber = (obj && obj.streetNumber) || null;
  }
}
