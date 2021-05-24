import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from 'src/app/entities/Event';
import { IService } from '../IService';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  collection!: AngularFirestoreCollection<Event>;
  document!: AngularFirestoreDocument<Event>;
  list!: Observable<Event[]>;
  collectionName!: string;

  constructor(public db: AngularFirestore) {
    this.collection = db.collection<Event>(this.collectionName);
    this.list = this.collection.snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) => {
          const data = snap.payload.doc.data() as Event;
          data.id = snap.payload.doc.id;
          return data;
        })
      )
    );
  }
  getAll(): Observable<Event[]> {
    return this.list;
  }
  add(t: Event): void {
    this.collection.add(t);
  }
  update(t: Event): void {
    this.document = this.db.doc(`${this.collectionName}/${t.id}`);
    this.document.update(t);
  }
  delete(t: Event): void {
    this.document = this.db.doc(`${this.collectionName}/${t.id}`);
    this.document.delete();
  }
}
