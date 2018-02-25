export class Topic {
  public _id: string;
  public name: string;
  public desc: string;
  public status: boolean;

  constructor(id: string, name: string, desc: string, status: boolean) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.status = status;
  }

}
