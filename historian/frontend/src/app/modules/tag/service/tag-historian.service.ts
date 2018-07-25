import 'rxjs/add/observable/of';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';
import { IModelService } from '../../../shared/base-model-service';
import { Utilities } from '../../../shared/utilities.service';
import { HistorianTag, IHistorianTag } from '../modele/HistorianTag';

@Injectable()
export class TagHistorianService implements IModelService<HistorianTag> {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;
  private SUCCESSFULLY_SAVED_MSG = 'successfully added tag';
  private SUCCESSFULLY_UPDATED_MSG = 'successfully modified tag';
  private SUCCESSFULLY_DELETED_MSG = 'successfully deleted tag';

  constructor(private http: HttpClient,
              private help: Utilities,
              private messageService: MessageService) { }

  getAll(): Observable<HistorianTag[]> {
    return this.http.get<HistorianTag[]>(`${this.tagsUrl}tags`)
      .pipe(
        map(tags => tags.map(t => new HistorianTag(t))),
        catchError(this.help.handleError('getAll()', []))
      );
  }

  getAllFromDatasource(datasourceId: string): Observable<HistorianTag[]> {
    const query = `datasource_id:"${datasourceId}"`;
    return this.getQuery(query);
  }

  getAllFromDatasources(datasourceIds: string[]): Observable<HistorianTag[]> {
    const query = datasourceIds.map(id => `datasource_id:"${id}"`).join(' OR ');
    return this.getQuery(query);
  }

  getAllWithIds(tagIds: string[]): Observable<HistorianTag[]> {
    if (tagIds.length === 0) {
      return Observable.of([]);
    } else {
      const query = tagIds.map(id => `id:"${id}"`).join(' OR ');
      return this.getQuery(query);
    }
  }

  getQuery(query: string): Observable<HistorianTag[]> {
    if (query && query.length !== 0) {
      console.log('query is "' + query + '"');
      return this.http.get<HistorianTag[]>(
        `${this.tagsUrl}tags`,
        {
          params: {
            fq : query
          }
        }
      ).pipe(
        map(tags => tags.map(t => new HistorianTag(t))),
        tap(tags => console.log(`found ${tags.length} historian tags from getQuery(${query})`)),
        catchError(this.help.handleError(`getQuery(${query})`, []))
      );
    } else {
      return this.getAll();
    }
  }

  get(id: string): Observable<HistorianTag> {
    return this.http.get<HistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`)
    .pipe(
      map(t => new HistorianTag(t)),
      catchError(this.help.handleError(`get(${id})`))
    );
  }
  save(obj: HistorianTag, id: string): Observable<HistorianTag> {
    return this.createOrReplace(obj);
  }
  update(obj: HistorianTag, id: string): Observable<HistorianTag> {
    return this.createOrReplace(obj);
  }
  createOrReplace(obj: HistorianTag): Observable<HistorianTag> {
    return this.http.put<HistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(obj.id)}`, obj, { observe: 'response' }).pipe(
      tap(resp => {
        const tag: IHistorianTag = resp.body;
        switch (resp.status) {
          case 201: {
            this.messageService.add({
              severity: 'success',
              summary: this.SUCCESSFULLY_SAVED_MSG,
              detail: `Saved tag with id ${tag.id}`,
            });
            break;
          }
          case 200: {
            this.messageService.add({
              severity: 'success',
              summary: this.SUCCESSFULLY_UPDATED_MSG,
              detail: `Modified tag with id ${tag.id}`,
            });
            break;
          }
          default: {
            console.error(`createOrReplace(${obj}) failed`, resp);
            break;
          }
       }
      }),
      map(resp => {
        return new HistorianTag(resp.body);
      }),
    );
  }

  saveMany(objs: HistorianTag[]): Observable<HistorianTag[]> {
    return this.http.post<HistorianTag[]>(`${this.tagsUrl}tags/batch`, objs).pipe(
      map(tags => tags.map(t => new HistorianTag(t))),
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

  delete(id: string): Observable<HistorianTag> {
    return this.http.delete<HistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`).pipe(
      map(t => new HistorianTag(t)),
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

  deleteMany(ids: string[]): Observable<HistorianTag[]> {
    return this.http.request<HistorianTag[]>('delete', `${this.tagsUrl}tags/batch`, { body: ids }).pipe(
      map(tags => tags.map(t => new HistorianTag(t))),
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
}
