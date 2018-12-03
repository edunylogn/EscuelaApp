import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PersonInterface } from '../models/personInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personsCollection: AngularFirestoreCollection<PersonInterface>;
  persons: Observable<PersonInterface[]>;
  personDoc: AngularFirestoreDocument<PersonInterface>;

  constructor(public afs: AngularFirestore) {
  //this.persons = afs.collection('persons').valueChanges();
    this.personsCollection = afs.collection<PersonInterface>('persons', ref => ref.orderBy('name'));
    this.persons = this.personsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PersonInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
    return this.personsCollection.add(person);
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
