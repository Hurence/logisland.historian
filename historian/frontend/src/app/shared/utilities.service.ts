import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError, concat } from 'rxjs/operators';

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

    merge<T>(obs: Observable<T[]>[]): Observable<T[]> {
        const emptyObs: Observable<T[]> = from([]);
        return obs.reduce((r, v, i, a) => {
          let myObs = r.pipe(concat(v));
          return myObs
        },
          emptyObs
        );
      }
}
