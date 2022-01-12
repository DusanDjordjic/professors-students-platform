export class SignupSubjectDetails {
  id: number;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
  }
}
