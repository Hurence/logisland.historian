import { Injectable } from '@angular/core';
import { Datasource } from './Datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatasourceService {

  private datasourcesUrl = 'http://localhost:8701/api/v1/datasources';

  constructor(private http: HttpClient) { }


  getDatasources(): Observable<Datasource[]> {
    return this.http.get<Datasource[]>(this.datasourcesUrl);
  }
}
