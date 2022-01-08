export class ErrorModel {
  text: string;
  status: number;
  constructor(text: string, status: number) {
    this.text = text;
    this.status = status;
  }
}
