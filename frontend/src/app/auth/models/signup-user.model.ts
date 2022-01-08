import { UserType } from 'src/shared/types/user.type';
import { SignupAddressDetails } from './signup-address-details.model';
import { SignupContactInfoDetails } from './signup-contact-info-details.model';

export class SignupUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: UserType;
  contactInfo: SignupContactInfoDetails;
  address: SignupAddressDetails;
  constructor(obj?: any) {
    this.firstname = (obj && obj.firstname) || null;
    this.lastname = (obj && obj.lastname) || null;
    this.username = (obj && obj.username) || null;
    this.password = (obj && obj.password) || null;
    this.type = (obj && obj.type) || null;
    this.contactInfo =
      (obj &&
        obj.contactInfo &&
        new SignupContactInfoDetails(obj.contactInfo)) ||
      new SignupContactInfoDetails();
    this.address =
      (obj && obj.address && new SignupAddressDetails(obj.address)) ||
      new SignupAddressDetails();
  }
}
