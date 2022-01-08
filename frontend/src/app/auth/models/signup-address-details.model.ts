export class AddressDetails {
  city: string;
  street: string;
  streetNumber: string;

  constructor(obj?: any) {
    this.city = (obj && obj.city) || null;
    this.street = (obj && obj.street) || null;
    this.streetNumber = (obj && obj.streetNumber) || null;
  }
}
