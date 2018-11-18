
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/userInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<UserInterface>;
  users: Observable<UserInterface[]>;
  userDoc: AngularFirestoreDocument<UserInterface>;

  constructor(public afs: AngularFirestore) {
    //this.users = afs.collection('users').valueChanges();
     this.usersCollection = afs.collection<UserInterface>('user', ref => ref.orderBy('username', 'desc'));
     this.users = this.usersCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as UserInterface;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
  }


  getUsers() {
    return this.users;
  }
  addUser(user: UserInterface) {
    console.log('NEW USER');
    this.usersCollection.add(user);
  }
  deleteUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.username}`);
    this.userDoc.delete();
  }
  updateUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.username}`);
    this.userDoc.update(user);
  }
}
