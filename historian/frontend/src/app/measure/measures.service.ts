import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Utilities } from '../shared/utilities.service';
import { Measures } from './Measures';
import { MeasuresRequest } from './MeasuresRequest';

@Injectable()
export class MeasuresService {

  private measuresUrl: string = `${environment.HISTORIAN_API_BASE_URL}`;

  constructor(private http: HttpClient,
    private help: Utilities) { }

  get(request: MeasuresRequest): Observable<Measures> {
    return this.http.get<Measures>(request.buildQuery(this.measuresUrl));
  }

  getStat(itemId: string): Observable<Measures> {
    return this.http.get<Measures>(`${this.measuresUrl}tags/${encodeURIComponent(itemId)}/stats`).pipe(
      tap(stat => console.log(`stat for item ${itemId}`, stat))
    );
  }
}
