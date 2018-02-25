export class Question {
  public _id: string;
  public content: string;
  public image: string;
  public level: string;
  public topic: [string];
  public answers: { content: string, correct: boolean }[];
}
