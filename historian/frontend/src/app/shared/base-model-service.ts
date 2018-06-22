import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Utilities } from './utilities.service';


export interface IModelService<M> {

  getAll(): Observable<M[]>;

  get(id: string): Observable<M>;

  save(obj: M, id: string): Observable<M>;

  update(obj: M, id: string): Observable<M>;

  delete(id: string): Observable<M>;
}

export abstract class AbstractModelService<M> implements IModelService<M> {

  protected baseUrl: string;

  constructor(protected http: HttpClient,
              protected help: Utilities,
              baseUrl: string) {
                this.baseUrl = baseUrl;
              }


  getAll(): Observable<M[]> {
    return this.http.get<M[]>(`${this.baseUrl}`)
      .pipe(
        map(items => items.map(item => Object.assign(this.create(), item))),
        catchError(this.help.handleError('getAll()', []))
      );
  }

  get(id: string): Observable<M> {
    return this.http.get<M>(`${this.baseUrl}/${id}`)
      .pipe(
        map(item => Object.assign(this.create(), item)),
        catchError(this.help.handleError(`get(${id})`))
      );
  }

  save(obj: M, id: string): Observable<M> {
    return this.http.post<M>(`${this.baseUrl}/${id}`, obj)
      .pipe(
        map(item => Object.assign(this.create(), item))
      );
  }

  update(obj: M, id: string): Observable<M> {
    return this.http.put<M>(`${this.baseUrl}/${id}`, obj)
      .pipe(
        map(item => Object.assign(this.create(), item))
      );
  }

  delete(id: string): Observable<M> {
    return this.http.delete<M>(`${this.baseUrl}/${id}`)
      .pipe(
        map(item => Object.assign(this.create(), item))
      );
  }

  protected abstract create(): M;
}
