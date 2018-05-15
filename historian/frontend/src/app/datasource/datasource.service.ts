import { Injectable } from '@angular/core';
import { Datasource } from './Datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class DatasourceService {

  private datasourcesUrl = 'http://localhost:8701/api/v1/datasources';
  constructor(private http: HttpClient) { }

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
      //TODO complexify parsing (add * ?)
      return query;    
  }

  getDatasourceTypes(): string[] {
    return ['OPC-DA', 'FAKE'];
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
