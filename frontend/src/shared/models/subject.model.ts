export class SubjectModel {
  _id: number;
  name: string;
  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.name = (obj && obj.name) || '';
  }
}
