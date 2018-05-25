import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Tag } from './tag';

@Injectable()
export class TagService {

  private tagsUrl = 'http://localhost:8701/api/v1/';

  constructor(private http: HttpClient) { }


  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl + 'tags')
    .pipe(
      catchError(this.handleError('getTags', []))
    );
  }

  getTagsFromDatasource(datasourceId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.tagsUrl}datasources/${datasourceId}/tags`)
    .pipe(
      catchError(this.handleError('getTagsFromDatasource', []))
    );
  }

  getTagsFromDatasourceQuery(datasourceId: string, query: string): Observable<Tag[]> {
    if (query && query.length !== 0) {
      return this.http.get<Tag[]>(`${this.tagsUrl}datasources/${datasourceId}/tags?fq=${this.formatQuery(query)}`)
      .pipe(
        catchError(this.handleError('getTagsFromDatasourceQuery', []))
      );
    } else {
      return this.getTagsFromDatasource(datasourceId);
    }
  }

  private formatQuery(query: string): string {
    // TODO complexify parsing (add * ?)
    return query;
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
