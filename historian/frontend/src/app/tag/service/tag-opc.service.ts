import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Utilities } from '../../shared/utilities.service';
import { IOpcTag } from '../modele/OpcTag';

@Injectable()
export class TagOpcService {


  private tagsUrl = 'http://localhost:8701/api/v1/';

  constructor(private http: HttpClient,
              private help: Utilities) { }

  getAll(): Observable<IOpcTag[]> {
    return this.http.get<IOpcTag[]>(`${this.tagsUrl}datasources/tags`)
    .pipe(
      catchError(this.help.handleError('getAll()', []))
    );
  }

  get(datasourceId: string): Observable<IOpcTag[]> {
    return this.http.get<IOpcTag[]>(`${this.tagsUrl}datasources/${datasourceId}/tags`)
    .pipe(
      catchError(this.help.handleError(`get(${datasourceId})`, []))
    );
  }

  gets(datasourceIds: string[]): Observable<IOpcTag[]> {
    const requests: Observable<IOpcTag[]>[] = datasourceIds.map(id => this.get(id))
    return this.help.zip(requests).pipe(
      catchError(this.help.handleError(`gets(${datasourceIds})`, []))
    );
  }

  // save(obj: IOpcTag): Observable<IOpcTag> {
  //   throw new Error("Method not implemented.");
  // }

  // update(obj: IOpcTag): Observable<IOpcTag> {
  //   throw new Error("Method not implemented.");
  // }

  // delete(obj: IOpcTag): Observable<IOpcTag> {
  //   throw new Error("Method not implemented.");
  // }


  // getTagsFromDatasourceQuery(datasourceId: string, query: string): Observable<Tag[]> {
  //   if (query && query.length !== 0) {
  //     return this.http.get<Tag[]>(`${this.tagsUrl}datasources/${datasourceId}/tags?fq=${this.formatQuery(query)}`)
  //     .pipe(
  //       catchError(this.handleError('getTagsFromDatasourceQuery', []))
  //     );
  //   } else {
  //     return this.getTagsFromDatasource(datasourceId);
  //   }
  // }

  // private formatQuery(query: string): string {
  //   // TODO complexify parsing (add * ?)
  //   return query;
  // }
}
