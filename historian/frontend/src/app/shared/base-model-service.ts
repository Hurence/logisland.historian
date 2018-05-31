import { Observable } from "rxjs/Observable";
import { of } from "rxjs";


export interface IModelService<M> {
  getAll(): Observable<M[]>;

  get(id: string): Observable<M>;

  save(obj: M): Observable<M>;

  update(obj: M): Observable<M>;

  delete(obj: M): Observable<M>;
}
