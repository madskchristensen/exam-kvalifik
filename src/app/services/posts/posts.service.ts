import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from 'src/app/entities/Post';
import { IService } from 'src/app/services/IService';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService implements IService<Post> {
  postsCollection!: AngularFirestoreCollection<Post>;
  postsDocument!: AngularFirestoreDocument<Post>;
  posts: Observable<Post[]>;
  private collectionName: string = 'posts';

  constructor(public db: AngularFirestore) {
    this.postsCollection = db.collection<Post>(this.collectionName);
    this.posts = this.postsCollection.snapshotChanges().pipe(
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
    return this.posts;
  }
  add(t: Post): void {
    this.postsCollection.add(t);
  }
  update(t: Post): void {
    this.postsDocument = this.db.doc(`${this.collectionName}/${t.id}`);
    this.postsDocument.update(t);
  }
  delete(t: Post): void {
    this.postsDocument = this.db.doc(`${this.collectionName}/${t.id}`);
    this.postsDocument.delete();
  }
}
