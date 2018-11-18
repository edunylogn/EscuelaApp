
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SectionInterface } from '../models/sectionInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  sectionsCollection: AngularFirestoreCollection<SectionInterface>;
  sections: Observable<SectionInterface[]>;
  sectionDoc: AngularFirestoreDocument<SectionInterface>;

  constructor(public afs: AngularFirestore) {
    //this.sections = afs.collection('sections').valueChanges();
     this.sectionsCollection = afs.collection<SectionInterface>('sections', ref => ref.orderBy('idsection', 'desc'));
     this.sections = this.sectionsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as SectionInterface;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
  }


  getSections() {
    return this.sections;
  }
  addSection(section: SectionInterface) {
    console.log('NEW Section');
    this.sectionsCollection.add(section);
  }
  deleteSection(section: SectionInterface) {
    this.sectionDoc = this.afs.doc(`sections/${section.idsection}`);
    this.sectionDoc.delete();
  }
  updateSection(section: SectionInterface) {
    this.sectionDoc = this.afs.doc(`sections/${section.idsection}`);
    this.sectionDoc.update(section);
  }
}
