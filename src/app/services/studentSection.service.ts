
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { StudentSectionInterface } from '../models/studentSectionInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentSectionService {
  studentSectionsCollection: AngularFirestoreCollection<StudentSectionInterface>;
  studentSections: Observable<StudentSectionInterface[]>;
  studentSectionDoc: AngularFirestoreDocument<StudentSectionInterface>;

  constructor(public afs: AngularFirestore) {
    this.studentSections = afs.collection('studentSections').valueChanges();
    // this.studentSectionsCollection = afs.collection<StudentSectionInterface>('studentSection', ref => ref.orderBy('title', 'desc'));
    // this.studentSections = this.studentSectionsCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as StudentSectionInterface;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
  }


  getStudentSections() {
    return this.studentSections;
  }
  addStudentSection(studentSection: StudentSectionInterface) {
    console.log('NEW STUDENTSECTION');
    this.studentSectionsCollection.add(studentSection);
  }
  deleteStudentSection(studentSection: StudentSectionInterface) {
    this.studentSectionDoc = this.afs.doc(`studentSections/${studentSection.idStudent,studentSection.idSection}`);
    this.studentSectionDoc.delete();
  }
  updateStudentSection(studentSection: StudentSectionInterface) {
    this.studentSectionDoc = this.afs.doc(`studentSections/${studentSection.idStudent,studentSection.idSection}`);
    this.studentSectionDoc.update(studentSection);
  }
}
