
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/userInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<UserInterface>;
  userDoc: AngularFirestoreDocument<UserInterface>;

  constructor(public afs: AngularFirestore) {
     this.usersCollection = afs.collection<UserInterface>('users', ref => ref.orderBy('username', 'desc'));
  }


  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  addUser(user: UserInterface) {
    console.log('NEW USER');
    this.usersCollection.add(user);
  }
  deleteUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }
  updateUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }
}
