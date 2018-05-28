import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Tag } from '../tag/tag';
import { Datasource } from './Datasource';
import { AbsModelService } from '../shared/base-model-service';

@Injectable()
export class DatasourceService extends AbsModelService<Datasource> {

  private datasourcesUrl = 'http://localhost:8701/api/v1/datasources';
  constructor(private http: HttpClient) {
    super();
  }

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
  delete(obj: Datasource): Observable<Datasource> {
    return this.http.delete<Datasource>(this.datasourcesUrl + '/' + obj.id);
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
