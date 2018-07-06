import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { IModelService } from '../../../shared/base-model-service';
import { Utilities } from '../../../shared/utilities.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { environment } from '../../../../environments/environment';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';

@Injectable()
export class TagHistorianService implements IModelService<IHistorianTag> {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;

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
    return this.getQuery(query);
  }

  getAllWithIds(tagIds: string[]): Observable<IHistorianTag[]> {
    if (tagIds.length === 0) {
      return Observable.of([]);
    } else {
      const query = tagIds.map(id => `id:"${id}"`).join(' OR ');
      return this.getQuery(query);
    }
  }

  getQuery(query: string): Observable<IHistorianTag[]> {
    if (query && query.length !== 0) {
      console.log('query is "' + query + '"');
      return this.http.get<IHistorianTag[]>(
        `${this.tagsUrl}tags`,
        {
          params: {
            fq : query
          }
        }
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
    return this.http.get<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`)
    .pipe(
      map(this.markAsHistTag),
      catchError(this.help.handleError(`get(${id})`))
    );
  }

  save(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.post<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(obj.id)}`, obj).pipe(
      map(this.markAsHistTag)
    );
  }

  update(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.put<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(obj.id)}`, obj).pipe(
      map(this.markAsHistTag)
    );
  }

  delete(id: string): Observable<IHistorianTag> {
    return this.http.delete<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`).pipe(
      map(this.markAsHistTag)
    );
  }

  getTreeTag(): Observable<RestTreeNode[]> {
    return this.http.get<RestTreeNode[]>(`${this.tagsUrl}tags/tree?limit=1`) // limit = 0 => solr facet only, return no tags
    .pipe(
      catchError(this.help.handleError('getTreeTag', []))
    );
  }

  private markAsHistTag(tag: IHistorianTag): IHistorianTag {
    tag.isHistorianTag = true;
    return tag;
  }
}
