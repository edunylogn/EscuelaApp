
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserTypeInterface } from '../models/userTypeInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  userTypeCollection: AngularFirestoreCollection<UserTypeInterface>;
  userTypes: Observable<UserTypeInterface[]>;
  userTypeDoc: AngularFirestoreDocument<UserTypeInterface>;

  constructor(public afs: AngularFirestore) {
    //this.userTypes = afs.collection('userTypes').valueChanges();
     this.userTypeCollection = afs.collection<UserTypeInterface>('userTypes', ref => ref.orderBy('name', 'desc'));
     this.userTypes = this.userTypeCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as UserTypeInterface;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
  }


  getUserTypes() {
    return this.userTypes;
  }
  addUserType(userType: UserTypeInterface) {
    console.log('NEW USERTYPE');
    this.userTypeCollection.add(userType);
  }
  deleteUserType(userType: UserTypeInterface) {
    this.userTypeDoc = this.afs.doc(`userTypes/${userType.id}`);
    this.userTypeDoc.delete();
  }
  updateUserType(userType: UserTypeInterface) {
    this.userTypeDoc = this.afs.doc(`userTypes/${userType.id}`);
    this.userTypeDoc.update(userType);
  }
}
