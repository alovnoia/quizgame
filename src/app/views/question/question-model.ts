export class Question {
  public _id: string;
  public content: string;
  public code: string;
  public image: string;
  public base64Image: string;
  public level: string;
  public topic: [object];
  public answers: { content: string, correct: boolean }[];
  public deleted: boolean;


  constructor() {
    this.content = '';
    this.image = '';
    this.level = '';
    this.code = '';
    this.topic = [{}];
    this.answers = [];
  }
}
