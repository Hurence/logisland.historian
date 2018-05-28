import { Observable } from "rxjs/Observable";
import { of } from "rxjs";


export interface ModelService<M> {
  getAll(): Observable<M[]>;

  get(id: string): Observable<M>;

  save(obj: M): Observable<M>;

  update(obj: M): Observable<M>;

  delete(obj: M): Observable<M>;
}

export abstract class AbsModelService<M> implements ModelService<M> {
  
  abstract getAll(): Observable<M[]>;

  abstract get(id: string): Observable<M>;

  abstract save(obj: M): Observable<M>;

  abstract update(obj: M): Observable<M>;

  abstract delete(obj: M): Observable<M>;
  
  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 }