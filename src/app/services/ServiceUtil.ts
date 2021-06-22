import {HttpClient, HttpHeaders} from "@angular/common/http";

export class ServiceUtil {

  public static getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }
}
