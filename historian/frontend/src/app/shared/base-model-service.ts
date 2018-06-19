import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utilities } from './utilities.service';
import { catchError } from 'rxjs/operators';


export interface IModelService<M> {

  getAll(): Observable<M[]>;

  get(id: string): Observable<M>;

  save(obj: M): Observable<M>;

  update(obj: M): Observable<M>;

  delete(obj: M): Observable<M>;
}

export interface IRestModelObject {
  id: string | number;
}

export abstract class AbstractModelService<M extends IRestModelObject> implements IModelService<M> {

  protected baseUrl: string;

  constructor(protected http: HttpClient,
              protected help: Utilities,
              baseUrl: string) {
                this.baseUrl = baseUrl;
              }


  getAll(): Observable<M[]> {
    return this.http.get<M[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.help.handleError('getAll()', []))
      );
  }

  get(id: string): Observable<M> {
    return this.http.get<M>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.help.handleError(`get(${id})`))
      );
  }

  save(obj: M): Observable<M> {
    return this.http.post<M>(`${this.baseUrl}/${obj.id}`, obj);
  }

  update(obj: M): Observable<M> {
    return this.http.put<M>(`${this.baseUrl}/${obj.id}`, obj);
  }

  delete(obj: M): Observable<M> {
    return this.http.delete<M>(`${this.baseUrl}/${obj.id}`);
  }
}
