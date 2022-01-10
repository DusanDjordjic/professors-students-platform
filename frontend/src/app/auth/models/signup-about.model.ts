export class SignupAboutDetails {
  about: string;
  constructor(obj?: any) {
    this.about = (obj && obj.about) || '';
  }
}
