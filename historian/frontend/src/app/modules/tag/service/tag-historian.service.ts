
import {of,  Observable } from 'rxjs';


import { HttpClient, HttpResponse, HttpRequest, HttpParams, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';
import { IHeader, IDefaultHeader } from '../../../core/modele/rest/Header';
import { IModelService } from '../../../shared/base-model-service';
import { Utilities } from '../../../shared/utilities.service';
import { HistorianTag, IHistorianTag } from '../modele/HistorianTag';

@Injectable()
export class TagHistorianService implements IModelService<HistorianTag> {

  private tagsUrl = `${environment.HISTORIAN_API_BASE_URL}`;
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
      return of([]);
    } else {
      const query = tagIds.map(id => `id:"${id}"`).join(' OR ');
      return this.getQuery(query);
    }
  }

  getQuery(query: string, limit?: number, sort?: string): Observable<HistorianTag[]> {
    const params: {[k: string]: any} = {};
    if (query) {
      params.fq = query;
    }
    if (limit !== undefined && limit !== null) {
      params.limit = limit;
    }
    if (sort) {
      params.sort = sort;
    }
    if (params) {
      console.log('param is', params);
      return this.http.get<HistorianTag[]>(
        `${this.tagsUrl}tags`,
        {
          params: params
        }
      ).pipe(
        map(tags => tags.map(t => new HistorianTag(t))),
        tap(tags => console.log(`found ${tags.length} historian tags from getQuery(${query})`)),
      );
    } else {
      console.log('no given param');
      return this.getAll();
    }
  }

  get(id: string): Observable<HistorianTag> {
    return this.http.get<HistorianTag>(`${this.tagsUrl}tags/${encodeURIComponent(id)}`)
    .pipe(
      map(t => new HistorianTag(t)),
    );
  }

  getByNodeIdAndDatasourceId(nodeId: string, datasourceId: String): Observable<HistorianTag[]> {
    return this.http.get<HistorianTag[]>(
      `${this.tagsUrl}tags`,
      {
        params: {
          fq : `node_id:"${nodeId}" AND datasource_id:"${datasourceId}"`
        }
      }
    ).pipe(
      map(tags => tags.map(t => new HistorianTag(t))),
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
    return this.http.get<RestTreeNode[]>(`${this.tagsUrl}tags/tree?limit=1`); // limit = 0 => solr facet only, return no tags
  }
  // (`${this.tagsUrl}tags/${encodeURIComponent(obj.id)}`, obj, { observe: 'response' })
  // Observable<HttpEvent<{}>>
  importTagCsv(csvFile: File, options?: {
                                separator?: string,
                                charset?: string,
                                bulkSize?: number
                                defaultValues?: IDefaultHeader[] 
                              }): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', csvFile, csvFile.name);    
    let params = new HttpParams();
    if (options) {
      if (options.separator !== null && options.separator !== undefined) {
        params = params.set('separator', options.separator);
      }
      if (options.charset !== null && options.charset !== undefined) {
        params = params.set('charset', options.charset);
      }
      if (options.bulkSize !== null && options.bulkSize !== undefined) {
        params = params.set('bulkSize', options.bulkSize.toString());
      }
      if (options.defaultValues !== null && options.defaultValues !== undefined) {
        formdata.append('default_headers', this.parseDefautValues(options.defaultValues));
      }
    }

    const httpOptions = {
      // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data'),
      reportProgress: true,
      responseType: 'json' as 'json',
      params: params
    };
    const req = new HttpRequest('POST', `${this.tagsUrl}tags/importcsv`, formdata, httpOptions);
    return this.http.request(req);
  }

  getTagCsvHeaders(): Observable<IHeader[]> {
    return this.http.get<IHeader[]>(`${this.tagsUrl}tags/importcsv`);
  }

  private parseDefautValues(defaultsValues: IDefaultHeader[]): string {
    return defaultsValues.map(h => `${h.name}:${h.value}`).join(',');
  }
}
