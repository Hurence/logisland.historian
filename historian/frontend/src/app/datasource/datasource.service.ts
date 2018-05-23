import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Tag } from '../tag/tag';
import { Datasource } from './Datasource';

@Injectable()
export class DatasourceService {

  private datasourcesUrl = 'http://localhost:8701/api/v1/datasources';
  constructor(private http: HttpClient) { }

  datasourceIsReachable(id: string): Observable<boolean> {
    return this.http.get<Tag[]>(this.datasourcesUrl + '/' + id + '/tags')
      .pipe(
        map(tags => true),
        catchError(error => of(false))
      );
  }

  getDatasource(id: string): Observable<Datasource> {
    return this.http.get<Datasource>(this.datasourcesUrl + '/' + id);
  }

  getDatasources(): Observable<Datasource[]> {
    return this.http.get<Datasource[]>(this.datasourcesUrl);
  }

  getDatasourcesQuery(queryParameter: string): Observable<Datasource[]> {
    if (queryParameter && queryParameter.length !== 0) {
      return this.http.get<Datasource[]>(
        this.datasourcesUrl + '?fq=' + this.formatQuery(queryParameter)
      );
    } else {
      return this.getDatasources();
    }
  }
  private formatQuery(query: string): string {
      // TODO complexify parsing (add * ?)
      return query;
  }

  getDatasourceTypes(): string[] {
    return ['', 'OPC-DA', 'OPC-UA'];
  }

  saveDatasource(datasource: Datasource): Observable<Datasource> {
    return this.http.post<Datasource>(this.datasourcesUrl + '/' + datasource.id, datasource);
  }

  updateDatasource(datasource: Datasource): Observable<Datasource> {
    return this.http.put<Datasource>(this.datasourcesUrl + '/' + datasource.id, datasource);
  }

  deleteDatasource(datasource: Datasource): Observable<Datasource> {
    return this.http.delete<Datasource>(this.datasourcesUrl + '/' + datasource.id);
  }
}
