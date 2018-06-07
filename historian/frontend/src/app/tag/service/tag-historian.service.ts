import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        catchError(this.help.handleError('getAll()', []))
      );
    } else {
      return this.getAll();
    }
  }

  get(id: string): Observable<IHistorianTag> {
    return this.http.get<IHistorianTag>(`${this.tagsUrl}tags/${id}`)
    .pipe(
      catchError(this.help.handleError(`get(${id})`))
    );
  }

  save(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.post<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj);
  }

  update(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.put<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj);
  }

  delete(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.delete<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`);
  }

}
