import { Injectable } from '@angular/core';
import { Datasource } from './Datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatasourceService {

  private datasourcesUrl = 'http://localhost:8701/api/v1/datasources';
  constructor(private http: HttpClient) { }

  guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  getDatasources(): Observable<Datasource[]> {
    return this.http.get<Datasource[]>(this.datasourcesUrl);
  }

  getDatasourceTypes(): string[] {
    return ['OPC-DA', 'FAKE'];
  }

  saveDatasource(datasource: Datasource): Observable<Datasource> {
    datasource.id = this.guid();
    return this.http.post<Datasource>(this.datasourcesUrl + '/' + datasource.id, datasource);
  }

  updateDatasource(datasource: Datasource): Observable<Datasource> {
    return this.http.put<Datasource>(this.datasourcesUrl + '/' + datasource.id, datasource);
  }

  deleteDatasource(datasource: Datasource): Observable<Datasource> {
    return this.http.delete<Datasource>(this.datasourcesUrl + '/' + datasource.id);
  }
}
