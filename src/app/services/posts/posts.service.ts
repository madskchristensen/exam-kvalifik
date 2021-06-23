import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Post } from 'src/app/entities/Post';
import { IService } from 'src/app/services/IService';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ServiceUtil} from "../ServiceUtil";

@Injectable({
  providedIn: 'root'
})

export class PostService implements IService<Post>{
  private collection: string = "posts.json";
  private collectionUrl: string = environment.firebase.databaseURL + "/" + this.collection;

  constructor(private http: HttpClient) {

  }

  add(t: Post): Observable<Post> {
    return this.http.post(this.collectionUrl, t, ServiceUtil.getHttpOptions()) as Observable<Post>;
  }

  delete(t: Post): Observable<Post> {
    const deleteUrl = environment.firebase.databaseURL + "/posts/" + t.id + ".json";

    return this.http.delete(deleteUrl, ServiceUtil.getHttpOptions()) as Observable<Post>;
  }

  getAll(): Observable<Post> {
    return this.http.get(this.collectionUrl, ServiceUtil.getHttpOptions()) as Observable<Post>;
  }

  update(t: Post): Observable<Post> {
    const updateUrl = environment.firebase.databaseURL + "/posts/" + t.id + ".json";

    return this.http.patch(updateUrl, t, ServiceUtil.getHttpOptions()) as Observable<Post>;
  }
}
