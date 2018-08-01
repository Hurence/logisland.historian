import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Utilities } from '../../../shared/utilities.service';
import { IOpcTag, OpcTag } from '../modele/OpcTag';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TagOpcService {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;

  constructor(private http: HttpClient,
              private help: Utilities) { }

  getAll(): Observable<OpcTag[]> {
    return this.http.get<OpcTag[]>(`${this.tagsUrl}datasources/tags`)
    .pipe(
      map(tags => tags.map(t => new OpcTag(t))),
      catchError(this.help.handleError('getAll()', []))
    );
  }
/**
 * browse tags of nodeId with specified depth ()
 * If nodeId is not specified it will browse all tags.
 * See documentation of historian backend.
 */
  browseTags(datasourceId: string, options?: { nodeId?: string, depth?: number }): Observable<OpcTag[]> {
    let params = new HttpParams();
    if (options) {
      if (options.nodeId !== null && options.nodeId !== undefined) {
        params = params.set('root', options.nodeId);
      }
      if (options.depth !== null && options.depth !== undefined) {
        params = params.set('depth', options.depth.toString());
      }
    }
    return this.http.get<OpcTag[]>(`${this.tagsUrl}datasources/${encodeURIComponent(datasourceId)}/tags`, {params: params})
    .pipe(
      map(tags => tags.map(t => new OpcTag(t))),
      tap(tags => console.log(`found ${tags.length} opc tags from datasource '${datasourceId}'`)),
      catchError(this.help.handleError(`get(${datasourceId})`, []))
    );
  }

  searchForTag(datasourceId: string, tagId: string): Observable<OpcTag> {
    return this.http.get<OpcTag>(`${this.tagsUrl}datasources/${encodeURIComponent(datasourceId)}/tags/${encodeURIComponent(tagId)}`)
    .pipe(
      map(tag => new OpcTag(tag)),
      catchError(this.help.handleError(`searchForTag(${datasourceId}, ${tagId})`, undefined))
    );
  }

  get(datasourceId: string): Observable<OpcTag[]> {
    return this.http.get<OpcTag[]>(`${this.tagsUrl}datasources/${encodeURIComponent(datasourceId)}/tags`)
    .pipe(
      map(tags => tags.map(t => new OpcTag(t))),
      tap(tags => console.log(`found ${tags.length} opc tags from datasource '${datasourceId}'`)),
      catchError(this.help.handleError(`get(${datasourceId})`, []))
    );
  }

  gets(datasourceIds: string[]): Observable<OpcTag[]> {
    const requests: Observable<OpcTag[]>[] = datasourceIds.map(id => this.get(id));
    return this.help.zip(requests).pipe(
      catchError(this.help.handleError(`gets(${datasourceIds})`, []))
    );
  }
}
