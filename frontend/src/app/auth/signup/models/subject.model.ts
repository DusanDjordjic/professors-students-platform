import { GroupModel } from './group.model';

export class SubjectModel {
  id: number;
  name: string;
  description: string;
  groupDetails: GroupModel;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || 0;
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
    this.groupDetails =
      (obj && obj.groupDetails && new GroupModel(obj.groupDetails)) ||
      new GroupModel();
  }
}
