
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RelationInterface } from '../models/relationInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  relationsCollection: AngularFirestoreCollection<RelationInterface>;
  relationDoc: AngularFirestoreDocument<RelationInterface>;

  constructor(public afs: AngularFirestore) {
    this.relationsCollection = afs.collection<RelationInterface>('relations', ref => ref.orderBy('relationship'));
  }


  getRelations() {
    return this.relationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RelationInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  addRelation(relation: RelationInterface) {
    console.log('NEW RELATIONSHIP');
    this.relationsCollection.add(relation);
  }
  deleteRelation(relation: RelationInterface) {
    this.relationDoc = this.afs.doc(`relations/${relation.id}`);
    this.relationDoc.delete();
  }
  updateRelation(relation: RelationInterface) {
    this.relationDoc = this.afs.doc(`relations/${relation.id}`);
    this.relationDoc.update(relation);
  }
}
