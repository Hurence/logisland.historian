import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Tag } from './tag';
import { AbsModelService } from '../shared/base-model-service';

@Injectable()
export class TagService extends AbsModelService<Tag> {

  private tagsUrl = 'http://localhost:8701/api/v1/';

  constructor(private http: HttpClient) {
    super();
   }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.tagsUrl}tags`)
    .pipe(
      catchError(this.handleError('getTags', []))
    );
  }

  get(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.tagsUrl}tags/${id}`)
    .pipe(
      catchError(this.handleError('getTag'))
    );
  }

  save(obj: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.tagsUrl}tags/${obj.id}`, obj);
  }

  update(obj: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.tagsUrl}tags/${obj.id}`, obj);
  }

  delete(obj: Tag): Observable<Tag> {
    return this.http.delete<Tag>(`${this.tagsUrl}tags/${obj.id}`);
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
}
