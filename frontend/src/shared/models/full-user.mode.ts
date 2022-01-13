import { UserType } from '../types/user.type';
import { Address } from './address.model';
import { ContactInfo } from './contact-info.model';

export class FullUser {
  username: string;
  firstname: string;
  lastname: string;
  type: UserType;
  about: string;
  contactInfo: ContactInfo;
  address: Address;
  constructor(obj?: any) {
    this.username = (obj && obj.username) || '';
    this.firstname = (obj && obj.firstname) || '';
    this.lastname = (obj && obj.lastname) || '';
    this.type = (obj && obj.type) || 'student';
    this.about = (obj && obj.about) || '';
    this.contactInfo =
      (obj && obj.contactInfo && new ContactInfo(obj.contactInfo)) ||
      new ContactInfo();
    this.address =
      (obj && obj.address && new Address(obj.address)) || new Address();
  }
}
