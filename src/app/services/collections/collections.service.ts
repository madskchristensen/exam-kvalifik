import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/entities/Collection';
import { IService } from '../IService';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService
  implements IService<Collection>
{
  collection!: AngularFirestoreCollection<Collection>;
  document!: AngularFirestoreDocument<Collection>;
  list!: Observable<Collection[]>;
  name!: string;

  constructor(public db: AngularFirestore) {
    this.collection = db.collection<Collection>(this.name);
    this.list = this.collection.snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) => {
          const data =
            snap.payload.doc.data() as Collection;
          data.id = snap.payload.doc.id;
          return data;
        })
      )
    );
  }
  getAll(): Observable<Collection[]> {
    return this.list;
  }
  add(t: Collection): void {
    this.collection.add(t);
  }
  update(t: Collection): void {
    this.document = this.db.doc(`${this.name}/${t.id}`);
    this.document.update(t);
  }
  delete(t: Collection): void {
    this.document = this.db.doc(`${this.name}/${t.id}`);
    this.document.delete();
  }
}
