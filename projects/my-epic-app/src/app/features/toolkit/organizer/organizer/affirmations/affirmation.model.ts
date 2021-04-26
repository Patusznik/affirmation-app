export class Affirmation {
  name: string;
  type: string;
  description: string;
  imagePath: string;
  id: string;
  createdAt?: firebase.default.firestore.Timestamp;

  // constructor(
  //   name: string,
  //   type: string,
  //   desc: string,
  //   imagePath: string,
  //   id: string
  // ) {
  //   this.name = name;
  //   this.type = type;
  //   this.description = desc;
  //   this.imagePath = imagePath;
  //   this.id = id;
  // }
}
