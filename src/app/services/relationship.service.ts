
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RelationInterface } from '../models/relationInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  relationsCollection: AngularFirestoreCollection<RelationInterface>;
  relations: Observable<RelationInterface[]>;
  relationDoc: AngularFirestoreDocument<RelationInterface>;

  constructor(public afs: AngularFirestore) {
    // this.relations = afs.collection('relations').valueChanges();
    this.relationsCollection = afs.collection<RelationInterface>('relations', ref => ref.orderBy('relationship'));
    this.relations = this.relationsCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RelationInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getRelations() {
    return this.relations;
  }
  addRelation(relation: RelationInterface) {
    console.log('NEW RELATIONSHIP');
    this.relationsCollection.add(relation);
  }
  deleteRelation(relation: RelationInterface) {
    this.relationDoc = this.afs.doc(`relations/${relation.parentIdentity,relation.parentIdentity,relation.studentIdentity}`);
    this.relationDoc.delete();
  }
  updateRelation(relation: RelationInterface) {
    this.relationDoc = this.afs.doc(`relations/${relation.parentIdentity,relation.parentIdentity,relation.studentIdentity}`);
    this.relationDoc.update(relation);
  }
}
