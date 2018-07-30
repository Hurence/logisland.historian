import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AbstractModelServiceCreateOrReplace } from '../../shared/base-model-service-create-or-replace';
import { Utilities } from '../../shared/utilities.service';
import { Tag } from '../tag/modele/tag';
import { Datasource, DatasourceType } from './Datasource';

@Injectable()
export class DatasourceService extends AbstractModelServiceCreateOrReplace<Datasource> {

  constructor(protected http: HttpClient,
              protected help: Utilities,
              protected messageService: MessageService) {
                super(http, help, messageService, `${environment.HISTORIAN_API_URL}datasources`)
               }

  datasourceIsReachable(id: string): Observable<boolean> {
    return this.http.get<Tag[]>(this.baseUrl + '/' + encodeURIComponent(id) + '/tags')
      .pipe(
        map(tags => true),
        catchError(error => of(false))
      );
  }

  getDatasourcesQuery(queryParameter: string): Observable<Datasource[]> {
    if (queryParameter && queryParameter.length !== 0) {
      return this.http.get<Datasource[]>(
        this.baseUrl + '?fq=' + this.formatQuery(queryParameter)
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

  protected create(item: Datasource): Datasource {
    return new Datasource(item);
  }
}
