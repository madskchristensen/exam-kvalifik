import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface IService<T> {
  collection: AngularFirestoreCollection<T>;
  document: AngularFirestoreDocument<T>;
  list: Observable<T[]>;
  name: string;
  getAll(): Observable<T[]>;
  add(t: T): void;
  update(t: T): void;
  delete(t: T): void;
}
