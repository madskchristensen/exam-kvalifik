import { Observable } from 'rxjs';

export interface IService<T> {
  getAll(): Observable<T>;
  add(t: T): Observable<T>;
  update(t: T): Observable<T>;
  delete(t: T): Observable<T>;
}
