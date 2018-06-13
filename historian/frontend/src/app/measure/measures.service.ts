import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Utilities } from '../shared/utilities.service';
import { IMeasures, Measures } from './Measures';
import { IMeasuresRequest } from './MeasuresRequest';
import { tap } from 'rxjs/operators';

@Injectable()
export class MeasuresService {

  private measuresUrl: string = environment.HISTORIAN_API_URL;

  constructor(private http: HttpClient,
    private help: Utilities) { }

  get(request: IMeasuresRequest): Observable<Measures> {
    return this.http.get<Measures>(request.buildQuery(this.measuresUrl));
  }

  getStat(itemId: string): Observable<Measures> {
    return this.http.get<Measures>(`${this.measuresUrl}tags/${itemId}/stats`).pipe(
      tap(stat => console.log(`stat for item ${itemId}`, stat))
    );
  }
}
