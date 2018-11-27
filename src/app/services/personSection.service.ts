
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PersonSectionInterface } from '../models/personSectionInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonSectionService {
  studentSectionsCollection: AngularFirestoreCollection<PersonSectionInterface>;
  studentSections: Observable<PersonSectionInterface[]>;
  studentSectionDoc: AngularFirestoreDocument<PersonSectionInterface>;

  constructor(public afs: AngularFirestore) {
    //this.studentSections = afs.collection('studentSections').valueChanges();
     this.studentSectionsCollection = afs.collection<PersonSectionInterface>('studentSections', ref => ref.orderBy('idSection', 'desc'));
     this.studentSections = this.studentSectionsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
         const data = a.payload.doc.data() as PersonSectionInterface;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
  }


  getStudentSections() {
    return this.studentSections;
  }
  addStudentSection(studentSection: PersonSectionInterface) {
    console.log('NEW STUDENTSECTION');
    this.studentSectionsCollection.add(studentSection);
  }
  deleteStudentSection(studentSection: PersonSectionInterface) {
    this.studentSectionDoc = this.afs.doc(`studentSections/${studentSection.idStudent,studentSection.idSection}`);
    this.studentSectionDoc.delete();
  }
  updateStudentSection(studentSection: PersonSectionInterface) {
    this.studentSectionDoc = this.afs.doc(`studentSections/${studentSection.idStudent,studentSection.idSection}`);
    this.studentSectionDoc.update(studentSection);
  }
}
