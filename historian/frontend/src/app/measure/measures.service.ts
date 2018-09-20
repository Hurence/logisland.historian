import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

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
    return this.http.get<Measures>(request.buildQuery(this.measuresUrl)).pipe(
      catchError(err => {
        // return an empty measure using label as name
        return Observable.of(new Measures({
          name: request.label
        }));
      })
    );
  }

  getStat(itemId: string): Observable<Measures> {
    return this.http.get<Measures>(`${this.measuresUrl}tags/${encodeURIComponent(itemId)}/stats`).pipe(
      tap(stat => console.log(`stat for item ${itemId}`, stat))
    );
  }
}
