import {
  AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Post} from "../entities/Post";

export interface IService<T> {
  collection: AngularFirestoreCollection<T>;
  document: AngularFirestoreDocument<T>;
  list: Observable<T[]>;
  name: string;
  getAll(): Observable<T[]>;
  add(t: T): Promise<T>;
  update(t: T): void;
  delete(t: T): void;
}
