import { UserType } from 'src/shared/types/user.type';
import { AddressDetails } from './signup-address-details.model';
import { ContactInfoDetails } from './signup-contact-info-details.model';

export class SignupUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: UserType;
  contactInfo: ContactInfoDetails;
  address: AddressDetails;
  constructor(obj?: any) {
    this.firstname = (obj && obj.firstname) || null;
    this.lastname = (obj && obj.lastname) || null;
    this.username = (obj && obj.username) || null;
    this.password = (obj && obj.password) || null;
    this.type = (obj && obj.type) || null;
    this.contactInfo =
      (obj && obj.contactInfo && new ContactInfoDetails(obj.contactInfo)) ||
      new ContactInfoDetails();
    this.address =
      (obj && obj.address && new AddressDetails(obj.address)) ||
      new AddressDetails();
  }
}
