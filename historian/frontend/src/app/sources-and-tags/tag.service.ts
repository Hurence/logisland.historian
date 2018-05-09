import { Injectable } from '@angular/core';
import { Datasource } from './Datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Tag } from './tag';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TagService {

  private tagsUrl = 'http://localhost:8701/api/v1/tags';

  constructor(private http: HttpClient) { }


  getTags(): Observable<Tag[]> {

    console.log('start method getTags');
    return this.http.get<Tag[]>(this.tagsUrl)
    .pipe(
      tap(tags => console.log(`fetched tags`)),
      catchError(this.handleError('getTags', []))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
