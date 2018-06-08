import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IModelService } from '../../shared/base-model-service';
import { Utilities } from '../../shared/utilities.service';
import { IHistorianTag } from '../modele/HistorianTag';

@Injectable()
export class TagHistorianService implements IModelService<IHistorianTag> {

  private tagsUrl = 'http://localhost:8701/api/v1/';

  constructor(private http: HttpClient,
              private help: Utilities) { }


  getAll(): Observable<IHistorianTag[]> {
    return this.http.get<IHistorianTag[]>(`${this.tagsUrl}tags`)
    .pipe(
      map(tags => tags.map(this.markAsHistTag)),
      catchError(this.help.handleError('getAll()', []))
    );
  }

  getAllFromDatasources(datasourceIds: string[]): Observable<IHistorianTag[]> {
    const query = datasourceIds.map(id => `datasource_id:"${id}"`).join(' OR ');
    console.log('query is "' + query + '"');
    return this.getQuery(query);
  }

  getQuery(query: string): Observable<IHistorianTag[]> {
    if (query && query.length !== 0) {
      return this.http.get<IHistorianTag[]>(
        `${this.tagsUrl}tags?fq=${query}`
      ).pipe(
        map(tags => tags.map(this.markAsHistTag)),
        tap(tags => console.log(`found ${tags.length} historian tags from getQuery(${query})`)),
        catchError(this.help.handleError(`getQuery(${query})`, []))
      );
    } else {
      return this.getAll();
    }
  }

  get(id: string): Observable<IHistorianTag> {
    return this.http.get<IHistorianTag>(`${this.tagsUrl}tags/${id}`)
    .pipe(
      map(this.markAsHistTag),
      catchError(this.help.handleError(`get(${id})`))
    );
  }

  save(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.post<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj).pipe(
      map(this.markAsHistTag)
    );
  }

  update(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.put<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj).pipe(
      map(this.markAsHistTag)
    );
  }

  delete(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.delete<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`).pipe(
      map(this.markAsHistTag)
    );
  }

  private markAsHistTag(tag: IHistorianTag): IHistorianTag {
    tag.isHistorianTag = true;
    return tag;
  }
}
