import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PersonInterface } from '../models/personInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personsCollection: AngularFirestoreCollection<PersonInterface>;
  personDoc: AngularFirestoreDocument<PersonInterface>;

  constructor(public afs: AngularFirestore) {
    this.personsCollection = afs.collection<PersonInterface>('persons', ref => ref.orderBy('name'));
  }

  getPersons() {
    return this.personsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PersonInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  addPerson(person: PersonInterface) {
    console.log('NEW PERSON');
    this.personsCollection.add(person);
  }
  deletePerson(person: PersonInterface) {
    this.personDoc = this.afs.doc(`persons/${person.id}`);
    this.personDoc.delete();
  }
  updatePerson(person: PersonInterface) {
    this.personDoc = this.afs.doc(`persons/${person.id}`);
    this.personDoc.update(person);
  }
}
