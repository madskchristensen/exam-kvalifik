import { Observable } from 'rxjs';

export interface IService<T> {
  getAll(): Observable<T[]>;
  add(t: T): void;
  update(t: T): void;
  delete(t: T): void;
}
