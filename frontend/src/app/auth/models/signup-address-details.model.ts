export class SignupAddressDetails {
  city: string;
  street: string | null;
  streetNumber: string | null;

  constructor(obj?: any) {
    this.city = (obj && obj.city) || null;
    this.street = (obj && obj.street) || null;
    this.streetNumber = (obj && obj.streetNumber) || null;
  }
}
