import {
  AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface IService<T> {
  collection: AngularFirestoreCollection<T>;
  list: Observable<T[]>;
  collectionName: string;
  getAll(): Observable<T[]>;
  add(t: T): Promise<T>;
  update(t: T): Promise<T>;
  delete(t: T): Promise<T>;
}
