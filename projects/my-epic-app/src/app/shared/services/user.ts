export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  createdAt?: firebase.default.firestore.Timestamp;
}
