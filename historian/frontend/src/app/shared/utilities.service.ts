import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concat, zip } from 'rxjs/operators';

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
  merge<T>(obs: Observable<T[]>[]): Observable<T[]> {
    const emptyObs: Observable<T[]> = from([]);
    return obs.reduce((r, v, i, a) => {
      let myObs = r.pipe(concat(v));
      return myObs
    },
      emptyObs
    );
  }
  /**
  *
  * @param obs array of observables to concat
  */
  zip<T>(obs: Observable<T[]>[]): Observable<T[]> {
    const emptyObs: Observable<T[]> = from([]);
    return obs.reduce((r, v, i, a) => {
      let myObs = r.pipe(zip(v, (a, b) => a.concat(b)));
      return myObs
    },
      emptyObs
    );
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
}
