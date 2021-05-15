import { Observable } from 'rxjs';

export interface IService<T> {
  getAll(): Observable<T[]>;
  get(id: string): T;
  add(t: T): void;
  update(t: T): void;
  delete(t: T): void;
}
