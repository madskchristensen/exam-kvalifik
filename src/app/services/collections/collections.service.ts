import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/entities/Collection';
import { IService } from '../IService';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ServiceUtil} from "../ServiceUtil";

@Injectable({
  providedIn: 'root'
})

export class CollectionsService implements IService<Collection> {
  private collection: string = "collections.json";
  private collectionUrl: string = environment.firebase.databaseURL + "/" + this.collection;

  constructor(private http: HttpClient) {

  }

  add(t: Collection): Observable<Collection> {
    return this.http.post(this.collectionUrl, t, ServiceUtil.getHttpOptions()) as Observable<Collection>;
  }

  delete(t: Collection): Observable<Collection> {
    const deleteUrl = environment.firebase.databaseURL + "/collections/" + t.id + ".json";

    return this.http.delete(deleteUrl, ServiceUtil.getHttpOptions()) as Observable<Collection>;
  }

  getAll(): Observable<Collection> {
    return this.http.get(this.collectionUrl, ServiceUtil.getHttpOptions()) as Observable<Collection>;
  }

  update(t: Collection): Observable<Collection> {
    const updateUrl = environment.firebase.databaseURL + "/collections/" + t.id + ".json";

    return this.http.patch(updateUrl, t, ServiceUtil.getHttpOptions()) as Observable<Collection>;
  }
}
