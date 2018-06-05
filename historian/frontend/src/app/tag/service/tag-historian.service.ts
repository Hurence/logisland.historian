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

  // getQuery(query: string): Observable<IHistorianTag[]> {
  //   return this.http.get<IHistorianTag[]>(`${this.tagsUrl}tags`)
  //   .pipe(
  //     catchError(this.help.handleError('getAll()', []))
  //   );
  // }

  get(id: string): Observable<IHistorianTag> {
    return this.http.get<IHistorianTag>(`${this.tagsUrl}tags/${id}`)
    .pipe(
      catchError(this.help.handleError(`get(${id})`))
    );
  }

  save(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.post<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj)
    .pipe(
      catchError(this.help.handleError(`save(${obj})`))
    );
  }

  update(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.put<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`, obj)
    .pipe(
      catchError(this.help.handleError(`update(${obj})`))
    );
  }

  delete(obj: IHistorianTag): Observable<IHistorianTag> {
    return this.http.delete<IHistorianTag>(`${this.tagsUrl}tags/${obj.id}`)
    .pipe(
      catchError(this.help.handleError(`delete(${obj})`))
    );
  }

}
