import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Utilities } from '../../../shared/utilities.service';
import { IOpcTag, OpcTag } from '../modele/OpcTag';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TagOpcService {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;

  constructor(private http: HttpClient,
              private help: Utilities) { }

  getAll(): Observable<OpcTag[]> {
    return this.http.get<OpcTag[]>(`${this.tagsUrl}datasources/tags`)
    .pipe(
      map(tags => tags.map(t => new OpcTag(t))),
      catchError(this.help.handleError('getAll()', []))
    );
  }

  get(datasourceId: string): Observable<OpcTag[]> {
    return this.http.get<OpcTag[]>(`${this.tagsUrl}datasources/${encodeURIComponent(datasourceId)}/tags`)
    .pipe(
      map(tags => tags.map(t => new OpcTag(t))),
      tap(tags => console.log(`found ${tags.length} opc tags from datasource '${datasourceId}'`)),
      catchError(this.help.handleError(`get(${datasourceId})`, []))
    );
  }

  gets(datasourceIds: string[]): Observable<OpcTag[]> {
    const requests: Observable<OpcTag[]>[] = datasourceIds.map(id => this.get(id));
    return this.help.zip(requests).pipe(
      catchError(this.help.handleError(`gets(${datasourceIds})`, []))
    );
  }
}
