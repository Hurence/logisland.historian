import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from '../tag/modele/tag';
import { Datasource, DatasourceType } from './Datasource';
import { IModelService } from '../../shared/base-model-service';
import { Utilities } from '../../shared/utilities.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class DatasourceService {

  private datasourcesUrl = `${environment.HISTORIAN_API_URL}datasources`;

  private SUCCESSFULLY_SAVED_MSG = 'successfully added datasource';
  private SUCCESSFULLY_UPDATED_MSG = 'successfully modified datasource';
  private SUCCESSFULLY_DELETED_MSG = 'successfully deleted datasource';

  constructor(private http: HttpClient,
              private help: Utilities,
              private messageService: MessageService) { }

  getAll(): Observable<Datasource[]> {
    return this.http.get<Datasource[]>(this.datasourcesUrl);
  }
  get(id: string): Observable<Datasource> {
    return this.http.get<Datasource>(this.datasourcesUrl + '/' + encodeURIComponent(id));
  }
  createOrReplace(obj: Datasource): Observable<Datasource> {
    return this.http.put<Datasource>(this.datasourcesUrl + '/' + encodeURIComponent(obj.id), obj, { observe: 'response' }).pipe(
      tap(resp => {
        const ds: Datasource = resp.body;
        switch (resp.status) {
          case 201: {
            this.messageService.add({
              severity: 'success',
              summary: this.SUCCESSFULLY_SAVED_MSG,
              detail: `Saved datasource with id ${ds.id}`,
            });
            break;
          }
          case 200: {
            this.messageService.add({
              severity: 'success',
              summary: this.SUCCESSFULLY_UPDATED_MSG,
              detail: `Modified datasource with id ${ds.id}`,
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
        return new Datasource(resp.body);
      }),
    );
  }

  delete(id: string): Observable<Datasource> {
    return this.http.delete<Datasource>(this.datasourcesUrl + '/' + encodeURIComponent(id)).pipe(
      tap(ds => {
        const detail = `Deleted datasource with id ${ds.id}`;
        this.messageService.add({
          severity: 'success',
          summary: this.SUCCESSFULLY_DELETED_MSG,
          detail: detail,
        });
      })
    );
  }

  datasourceIsReachable(id: string): Observable<boolean> {
    return this.http.get<Tag[]>(this.datasourcesUrl + '/' + encodeURIComponent(id) + '/tags')
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
    const datasourceTypes: string[] = [];
    const keys: (keyof typeof DatasourceType)[] = <(keyof typeof DatasourceType)[]>Object.keys(DatasourceType);
    for (const key of keys) {
      datasourceTypes.push(DatasourceType[key]);
    }
    return datasourceTypes;
  }


}
