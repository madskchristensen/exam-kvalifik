import { Injectable } from '@angular/core';
import {IService} from "../IService";
import {Observable} from "rxjs";
import {Event} from "../../entities/Event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ServiceUtil} from "../ServiceUtil";

@Injectable({
  providedIn: 'root'
})

export class EventsService implements IService<Event>{
  private collection: string = "events.json";
  private collectionUrl: string = environment.firebase.databaseURL + "/" + this.collection;

  constructor(private http: HttpClient) {

  }

  add(t: Event): Observable<Event> {
    return this.http.post(this.collectionUrl, t, ServiceUtil.getHttpOptions()) as Observable<Event>;
  }

  delete(t: Event): Observable<Event> {
    const deleteUrl = environment.firebase.databaseURL + "/events/" + t.id + ".json";

    return this.http.delete(deleteUrl, ServiceUtil.getHttpOptions()) as Observable<Event>;
  }

  getAll(): Observable<Event> {
    return this.http.get(this.collectionUrl, ServiceUtil.getHttpOptions()) as Observable<Event>;
  }

  update(t: Event): Observable<Event> {
    const updateUrl = environment.firebase.databaseURL + "/events/" + t.id + ".json";

    return this.http.patch(updateUrl, t, ServiceUtil.getHttpOptions()) as Observable<Event>;
  }
}
