import { Injectable } from '@angular/core';
import {Observable, empty} from 'rxjs';
import { Post } from 'src/app/entities/Post';
import { IService } from 'src/app/services/IService';
import {AppState} from "../../store/Store";
import {NgRedux} from "@angular-redux/store";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PostService  {
  collection: string = "posts.json";
  url: string = environment.firebase.databaseURL + this.collection

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {

  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  getAll(): Observable<any> {
    return this.http.get(this.url, this.getHttpOptions());
  }

  add(t: Post): Observable<any> {
    return this.http.post(this.url, t, this.getHttpOptions());
  }

  update(t: Post): Observable<any> {
    return empty();
  }

  delete(t: Post): Observable<any> {
    return empty();
  }
}
