export class GroupModel {
  id: number;
  name: string;
  description: string;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || 0;
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
  }
}
