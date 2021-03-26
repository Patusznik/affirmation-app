export class Affirmation {
  public name: string;
  public type: string;
  public description: string;
  public imagePath: string;
  public checked: boolean;
  public id: string;

  constructor(
    name: string,
    type: string,
    desc: string,
    imagePath: string,
    checked: boolean,
    id: string
  ) {
    this.name = name;
    this.type = type;
    this.description = desc;
    this.imagePath = imagePath;
    this.checked = checked;
    this.id = id;
  }
}
