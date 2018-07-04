import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Utilities } from '../../../shared/utilities.service';
import { IOpcTag } from '../modele/OpcTag';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TagOpcService {

  private tagsUrl = `${environment.HISTORIAN_API_URL}`;

  constructor(private http: HttpClient,
              private help: Utilities) { }

  getAll(): Observable<IOpcTag[]> {
    return this.http.get<IOpcTag[]>(`${this.tagsUrl}datasources/tags`)
    .pipe(
      catchError(this.help.handleError('getAll()', []))
    );
  }

  get(datasourceId: string): Observable<IOpcTag[]> {
    return this.http.get<IOpcTag[]>(`${this.tagsUrl}datasources/${encodeURIComponent(datasourceId)}/tags`)
    .pipe(
      catchError(this.help.handleError(`get(${datasourceId})`, []))
    );
  }

  gets(datasourceIds: string[]): Observable<IOpcTag[]> {
    const requests: Observable<IOpcTag[]>[] = datasourceIds.map(id => this.get(id));
    return this.help.zip(requests).pipe(
      catchError(this.help.handleError(`gets(${datasourceIds})`, []))
    );
  }
}
