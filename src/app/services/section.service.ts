
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SectionInterface } from '../models/sectionInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  sectionsCollection: AngularFirestoreCollection<SectionInterface>;
  sectionDoc: AngularFirestoreDocument<SectionInterface>;

  constructor(public afs: AngularFirestore) {
     this.sectionsCollection = afs.collection<SectionInterface>('sections', ref => ref.orderBy('idSection', 'desc'));
  }

  getSections() {
    return this.sectionsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SectionInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  addSection(section: SectionInterface) {
    console.log('NEW Section');
    this.sectionsCollection.add(section);
  }
  deleteSection(section: SectionInterface) {
    this.sectionDoc = this.afs.doc(`sections/${section.id}`);
    this.sectionDoc.delete();
  }
  updateSection(section: SectionInterface) {
    this.sectionDoc = this.afs.doc(`sections/${section.id}`);
    this.sectionDoc.update(section);
  }
}
