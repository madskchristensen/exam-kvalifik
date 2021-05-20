import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentReference
} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import { Post } from 'src/app/entities/Post';
import { IService } from 'src/app/services/IService';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService implements IService<Post> {
  collection!: AngularFirestoreCollection<Post>;
  document!: AngularFirestoreDocument<Post>;
  list: Observable<Post[]>;
  name: string = 'posts';

  constructor(public db: AngularFirestore) {
    this.collection = db.collection<Post>(
      this.name
    );
    this.list = this.collection
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            const data = snap.payload.doc.data() as Post;
            data.id = snap.payload.doc.id;
            return data;
          })
        )
      );
  }
  getAll(): Observable<Post[]> {
    return this.list;
  }

  add(t: Post): Promise<Post> {
    let postFromFirestore: Post;

    this.collection.add(t)
      .then(document => {
        document.get()
          .then(snapshot => {
            postFromFirestore = snapshot.data() as Post;
          })
      })

    return new Promise<Post>((resolve, reject) => {
      if (postFromFirestore) {
        resolve(postFromFirestore)
      } else {
        reject(postFromFirestore)
      }
    })

    // return from(this.collection.add(t))
    //   .pipe(
    //     map(doc => this.collection.doc<Post>(doc.id).valueChanges())
    //   )
  }
  update(t: Post): void {
    this.document = this.db.doc(
      `${this.name}/${t.id}`
    );
    this.document.update(t);
  }
  delete(t: Post): void {
    this.document = this.db.doc(
      `${this.name}/${t.id}`
    );
    this.document.delete();
  }
}
