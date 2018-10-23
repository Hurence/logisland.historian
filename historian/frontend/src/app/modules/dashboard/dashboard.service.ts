import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { IModelService } from '../../shared/base-model-service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Utilities } from '../../shared/utilities.service';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from './modele/Dashboard';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DashboardService implements IModelService<Dashboard> {

  protected baseUrl: string = `${environment.HISTORIAN_API_BASE_URL}dashboards`;
  protected objNameForMsg: string = 'datasource';

  constructor(protected http: HttpClient,
              protected help: Utilities,
              protected messageService: MessageService) {}


  getAll(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.baseUrl}`)
      .pipe(
        map(items => items.map(item => this.create(item))),
      );
  }

  get(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.baseUrl}/${encodeURIComponent(id)}`)
      .pipe(
        map(item => this.create(item)),
      );
  }

  save(obj: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>(`${this.baseUrl}/create`, obj, { observe: 'response' }).pipe(
      tap(resp => {
        switch (resp.status) {
          case 200: {
            this.messageService.add({
              severity: 'success',
              summary: `successfully added ${this.objNameForMsg}`,
              detail: `Saved new ${this.objNameForMsg}`,
            });
            break;
          }
          case 400: {
            this.messageService.add({
              severity: 'error',
              summary: `Could not add ${this.objNameForMsg}`,
              detail: `Bad request`,
            });
            break;
          }
          default: {
            console.error(`createOrReplace(${obj}) failed`, resp);
            break;
          }
        }
      }),
      map(resp => this.create(resp.body))
    );
  }

  update(obj: Dashboard, id: string): Observable<Dashboard> {
    return this.http.put<Dashboard>(`${this.baseUrl}/${encodeURIComponent(id)}`, obj, { observe: 'response' }).pipe(
      tap(resp => {
        switch (resp.status) {
          case 200: {
            this.messageService.add({
              severity: 'success',
              summary: `successfully updated ${this.objNameForMsg}`,
              detail: `Updated ${this.objNameForMsg} with id ${id}`,
            });
            break;
          }
          case 400: {
            this.messageService.add({
              severity: 'error',
              summary: `Could not add ${this.objNameForMsg}`,
              detail: `Invalid id ${id}`,
            });
            break;
          }
          case 404: {
            this.messageService.add({
              severity: 'error',
              summary: `Could not add ${this.objNameForMsg}`,
              detail: `Id not found ${id}`,
            });
            break;
          }
          default: {
            console.error(`createOrReplace(${obj}) failed`, resp);
            break;
          }
        }
      }),
      map(resp => this.create(resp.body))
    );
  }

  delete(id: string): Observable<Dashboard> {
    return this.http.delete<Dashboard>(`${this.baseUrl}/${encodeURIComponent(id)}`)
      .pipe(
        tap(item => {
          this.messageService.add({
            severity: 'success',
            summary: `successfully deleted ${this.objNameForMsg}`,
            detail: `Deleted ${this.objNameForMsg} with id ${id}`,
          });
        }),
        map(item => this.create(item))
      );
  }

  protected create(item: Dashboard): Dashboard {
    return item;
  }
}
