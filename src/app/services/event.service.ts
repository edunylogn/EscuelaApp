import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EventInterface } from '../models/eventInterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsCollection: AngularFirestoreCollection<EventInterface>;
  eventDoc: AngularFirestoreDocument<EventInterface>;

  constructor(public afs: AngularFirestore) {
    this.eventsCollection = afs.collection<EventInterface>('events', ref => ref.orderBy('title', 'desc'));
  }

  getEvents() {
    return this.eventsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as EventInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addEvent(event: EventInterface) {
    console.log('NEW EVENT');
    this.eventsCollection.add(event);
  }
  deleteEvent(event: EventInterface) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.delete();
  }
  updateEvent(event: EventInterface) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.update(event);
  }
}
