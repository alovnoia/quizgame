export class Challenge {
  public _id: string;
  public code: string;
  public user: string;
  public level: string;
  public topic: {
    id: string,
    name: string
  };
  public packages: {};
  public questions: [{}];
  public usage: number;
  public status: boolean;
  public enable: boolean;
}
