export class Package {
  public _id: string;
  public code: string;
  public level: string;
  public topic: {
    id: string,
    name: string
  };
  public questions: [{
    id: string,
    code: string
  }];
  public usage: number;
  public deleted: boolean;

  constructor(obj) {
    this.code = obj.code,
    this.level = obj.level,
    this.topic = {
      id: obj.topic._id,
      name: obj.topic.name
    };
    this.questions = [{id: '', code: ''}];
  }
}
