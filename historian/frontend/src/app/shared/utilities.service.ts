import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concat, zip, merge } from 'rxjs/operators';

@Injectable()
export class Utilities {

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /**
   *
   * @param obs array of observables to concat
   */
  concat<T>(obs: Observable<T[]>[]): Observable<T[]> {
    return this.mergeArrayObs(obs, this.concatObs)
  }
  /**
   *
   * @param obs array of observables to concat
   */
  merge<T>(obs: Observable<T[]>[]): Observable<T[]> {
    return this.mergeArrayObs(obs, this.mergeObs)
  }
  /**
  *
  * @param obs array of observables to concat
  */
  zip<T>(obs: Observable<T[]>[]): Observable<T[]> {
    return this.mergeArrayObs(obs, this.zipObs)
  }

  /** group the array by a key
   *
   * Example:
   * {{{
   *    groupBy(Array[1,2,3,4,5,6], (i) => i % 2)
   * }}}
   * will return the following object
   * {{{
   *    {
   *      '0': [2, 4, 6],
   *      '1': [1, 3, 5],
   *    }
   * }}}
   *
   * @param array the array to group
   * @param key a method that return the key to group by
   */
  groupBy<T, K>(array: T[], key: (T) => string): any {
    return array.reduce(
      (r, v) => {
        (r[key(v)] = r[key(v)] || []).push(v);
        return r;
      },
      {}
    )
  }


    /**
  *
  * @param obs array of observables to concat
  */
  private mergeArrayObs<T>(
    obs: Observable<T[]>[],
    callback: (a:Observable<T[]>, b:Observable<T[]>) => Observable<T[]>): Observable<T[]> {

    if (obs.length === 1) return obs[0];
    const emptyObs: Observable<T[]> = from([]);
    if (obs.length === 0) return emptyObs;

    return obs.reduce((r, v, i, a) => {
      return callback(r, v);
    },
      emptyObs
    );
  }

  private zipObs<T>(ob1: Observable<T[]>, ob2: Observable<T[]>): Observable<T[]> {
    return ob1.pipe(zip(ob2, (a, b) => a.concat(b)));
  }

  private mergeObs<T>(ob1: Observable<T[]>, ob2: Observable<T[]>): Observable<T[]> {
    return ob1.pipe(merge(ob2));
  }

  private concatObs<T>(ob1: Observable<T[]>, ob2: Observable<T[]>): Observable<T[]> {
    return ob1.pipe(concat(ob2));
  }
}
