import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Utilities } from '../shared/utilities.service';
import { Measures } from './Measures';
import { MeasuresRequest } from './MeasuresRequest';

export interface MeasureRequestBack {
  tagId: string;
  start: string;
  end: string;
  function: string;
  no_values: boolean;
}

@Injectable()
export class MeasuresService {

  private baseUrl: string = `${environment.HISTORIAN_API_BASE_URL}`;


  constructor(private http: HttpClient,
    private help: Utilities) { }

  get(request: MeasuresRequest): Observable<Measures> {
    return this.http.get<Measures>(request.buildQuery(this.baseUrl)).pipe(
      catchError(err => {
        // return an empty measure using label as name
        return of(new Measures({
          name: request.label
        }));
      })
    );
  }
  /**
   *
   * @param requests data requested
   *
   * Return empty list if no data has been found for all request
   */
  getMany(requests: MeasuresRequest[]): Observable<Measures[]> {
    const tagRequests: MeasureRequestBack[] = requests.map(req => {
      return {
        tagId: req.itemId,
        start: req.start,
        end: req.end,
        function: req.functions,
        no_values: req.no_values,
      };
    });
    return this.http.post<Measures[]>(`${this.baseUrl}tags/measures/getmany`, tagRequests, { observe: 'response' }).pipe(
      map(resp => {
        switch (resp.status) {
          case 200:
            return resp.body;
          case 404:  {
            return [];
          }
          default: {
            console.error(`getMany failed`, resp);
            break;
          }
        }
      })
    );
  }

  getStat(itemId: string): Observable<Measures> {
    return this.http.get<Measures>(`${this.baseUrl}tags/${encodeURIComponent(itemId)}/stats`).pipe(
      tap(stat => console.log(`stat for item ${itemId}`, stat))
    );
  }
}
