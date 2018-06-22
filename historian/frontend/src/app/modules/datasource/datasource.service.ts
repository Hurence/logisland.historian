import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Tag } from '../tag/modele/tag';
import { Datasource } from './Datasource';
import { IModelService } from '../../shared/base-model-service';
import { Utilities } from '../../shared/utilities.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class DatasourceService implements IModelService<Datasource> {

  private datasourcesUrl = `${environment.HISTORIAN_API_URL}datasources`;


  constructor(private http: HttpClient,
              private help: Utilities) { }

  getAll(): Observable<Datasource[]> {
    return this.http.get<Datasource[]>(this.datasourcesUrl);
  }
  get(id: string): Observable<Datasource> {
    return this.http.get<Datasource>(this.datasourcesUrl + '/' + id);
  }
  save(obj: Datasource): Observable<Datasource> {
    return this.http.post<Datasource>(this.datasourcesUrl + '/' + obj.id, obj);
  }
  update(obj: Datasource): Observable<Datasource> {
    return this.http.put<Datasource>(this.datasourcesUrl + '/' + obj.id, obj);
  }
  delete(id: string): Observable<Datasource> {
    return this.http.delete<Datasource>(this.datasourcesUrl + '/' + id);
  }

  datasourceIsReachable(id: string): Observable<boolean> {
    return this.http.get<Tag[]>(this.datasourcesUrl + '/' + id + '/tags')
      .pipe(
        map(tags => true),
        catchError(error => of(false))
      );
  }

  getDatasourcesQuery(queryParameter: string): Observable<Datasource[]> {
    if (queryParameter && queryParameter.length !== 0) {
      return this.http.get<Datasource[]>(
        this.datasourcesUrl + '?fq=' + this.formatQuery(queryParameter)
      );
    } else {
      return this.getAll();
    }
  }
  private formatQuery(query: string): string {
      // TODO complexify parsing (add * ?)
      return query;
  }

  getDatasourceTypes(): string[] {
    return ['', 'OPC-DA', 'OPC-UA'];
  }


}
