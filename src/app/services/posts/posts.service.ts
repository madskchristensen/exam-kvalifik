import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
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
  posts: Observable<Post[]>;
  private collectionName: string = 'posts';

  constructor(public db: AngularFirestore) {
    this.postsCollection = db.collection<Post>(this.collectionName);
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) => {
          const data = snap.payload.doc.data() as Post;
          const id = snap.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getAll(): Observable<Post[]> {
    return this.posts;
  }
  get(id: string): Post {
    throw new Error('Method not implemented.');
  }
  add(t: Post): void {
    throw new Error('Method not implemented.');
  }
  update(t: Post): void {
    throw new Error('Method not implemented.');
  }
  delete(t: Post): void {
    throw new Error('Method not implemented.');
  }
}
