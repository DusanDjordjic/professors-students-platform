import { UserType } from 'src/shared/types/user.type';
import { SignupAddressDetails } from './signup-address-details.model';
import { SignupContactInfoDetails } from './signup-contact-info-details.model';
import { SignupSubjectDetails } from './signup-subject.model';

export class SignupUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: UserType;
  contactInfo: SignupContactInfoDetails;
  address: SignupAddressDetails;
  subjects: SignupSubjectDetails[];
  about: string;
  constructor(obj?: any) {
    this.firstname = (obj && obj.firstname) || 'Dusan';
    this.lastname = (obj && obj.lastname) || 'Djordjic';
    this.username = (obj && obj.username) || 'DusanDux001';
    this.password = (obj && obj.password) || 'DusanDux00!';
    this.type = (obj && obj.type) || 'student';
    this.contactInfo =
      (obj &&
        obj.contactInfo &&
        new SignupContactInfoDetails(obj.contactInfo)) ||
      new SignupContactInfoDetails({
        email: 'dukidjordjic@gmail.com',
        phoneNumber: '+381 64 1315 524',
        website: 'dusandjordjic.vercel.app',
      });
    this.address =
      (obj && obj.address && new SignupAddressDetails(obj.address)) ||
      new SignupAddressDetails({
        city: 'Novi Sad',
        street: 'Bulevar Evrope',
        streetNumber: '15b',
      });
    this.subjects = [
      new SignupSubjectDetails({ id: 1 }),
      new SignupSubjectDetails({ id: 3 }),
      new SignupSubjectDetails({ id: 8 }),
      new SignupSubjectDetails({ id: 4 }),
    ];
    this.about =
      (obj && obj.about) ||
      'Moje ime je Dusan Djordjic, dolazim is Sremske Mitrovice sa zeljom da postanem najbolji web programer u Srbiji i sire. Sve to radim da bih jednoga dana mogao da pomazem drugima da to isto postignu';
  }
}
// this.firstname = (obj && obj.firstname) || null;
// this.lastname = (obj && obj.lastname) || null;
// this.username = (obj && obj.username) || null;
// this.password = (obj && obj.password) || null;
// this.type = (obj && obj.type) || null;
// this.contactInfo =
//   (obj &&
//     obj.contactInfo &&
//     new SignupContactInfoDetails(obj.contactInfo)) ||
//   new SignupContactInfoDetails();
// this.address =
//   (obj && obj.address && new SignupAddressDetails(obj.address)) ||
//   new SignupAddressDetails();
// this.subjects = [];
// this.about = (obj && obj.about) || '';
