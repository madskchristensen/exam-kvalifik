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
import { isEqual } from "lodash";

@Injectable({
  providedIn: 'root'
})

export class PostService implements IService<Post> {
  collection!: AngularFirestoreCollection<Post>;
  list: Observable<Post[]>;
  collectionName: string = 'posts';

  constructor(public db: AngularFirestore) {
    this.collection = db.collection<Post>(
      this.collectionName
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
    });
  }

  // https://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application
  update(t: Post): Promise<Post> {
    // get document with same id as t from firebase
    let document: AngularFirestoreDocument<Post> = this.db.doc(
      `${this.collectionName}/${t.id}`
    );

    document.update(t)

    // extract post from the document
    let postFromAngular: Post;
    document.get().subscribe(snapshot => {
      postFromAngular = snapshot.data() as Post;
    });

    return new Promise<Post>((resolve, reject) => {
      if (isEqual(t, postFromAngular)) {
        resolve(t)
      } else if (!isEqual(t, postFromAngular)) {
        reject(postFromAngular)
      }
    });
  }

  delete(t: Post): Promise<Post> {
    // get document with same id as t from firebase
    let document: AngularFirestoreDocument<Post> = this.db.doc(
      `${this.collectionName}/${t.id}`
    );

    document.delete();

    // extract post from the document
    let postFromAngular: Post;
    document.get().subscribe(snapshot => {
      postFromAngular = snapshot.data() as Post;
    });

    return new Promise<Post>((resolve, reject) => {
      if (!postFromAngular) {
        resolve(t)
      } else if (postFromAngular) {
        reject(t)
      }
    });
  }
}
