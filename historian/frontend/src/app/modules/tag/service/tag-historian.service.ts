import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';
import { IModelService } from '../../../shared/base-model-service';
import { Utilities } from '../../../shared/utilities.service';
import { IHistorianTag } from '../modele/HistorianTag';

@Injectable()
export class TagHistorianService implements IModelService<IHistorianTag> {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;
  private SUCCESSFULLY_SAVED_MSG = 'successfully added tag';
  private SUCCESSFULLY_DELETED_MSG = 'successfully deleted tag';

  constructor(private http: HttpClient,
              private help: Utilities,
              private messageService: MessageService) { }

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
      map(this.markAsHistTag),
      tap(tag => {
        const detail = `Saved tag with id ${tag.id}`;
        this.messageService.add({
          severity: 'success',
          summary: this.SUCCESSFULLY_SAVED_MSG,
          detail: detail,
        });
      }),
    );
  }

  saveMany(objs: IHistorianTag[]): Observable<IHistorianTag[]> {
    return this.http.post<IHistorianTag[]>(`${this.tagsUrl}tags/batch`, objs).pipe(
      map(tags => tags.map(this.markAsHistTag)),
      tap(tags => {
        let detail;
        if (tags.length > 1) {
          detail = `Saved ${tags.length} tags`;
        } else {
          detail = `Saved ${tags.length} tag`;
        }
        this.messageService.add({
          severity: 'success',
          summary: this.SUCCESSFULLY_SAVED_MSG,
          detail: detail,
        });
      })
    );
  }

  update(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.put<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(obj.id)}`, obj).pipe(
      map(this.markAsHistTag)
    );
  }

  delete(id: string): Observable<IHistorianTag> {
    return this.http.delete<IHistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`).pipe(
      map(this.markAsHistTag),
      tap(tag => {
        const detail = `Deleted tag with id ${tag.id}`;
        this.messageService.add({
          severity: 'success',
          summary: this.SUCCESSFULLY_DELETED_MSG,
          detail: detail,
        });
      })
    );
  }

  deleteMany(ids: string[]): Observable<IHistorianTag[]> {
    return this.http.request<IHistorianTag[]>('delete', `${this.tagsUrl}tags/batch`, { body: ids }).pipe(
      map(tags => tags.map(this.markAsHistTag)),
      tap(tags => {
        let detail;
        if (tags.length > 1) {
          detail = `Deleted ${tags.length} tags`;
        } else {
          detail = `Deleted ${tags.length} tag`;
        }
        this.messageService.add({
          severity: 'success',
          summary: this.SUCCESSFULLY_DELETED_MSG,
          detail: detail,
        });
      })
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
