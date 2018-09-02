import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Utilities } from './shared/utilities.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs';

@Injectable()
export class DataFlowService {

    private baseUrl = `${environment.HISTORIAN_API_URL}dataflows`;

    constructor(protected http: HttpClient, protected help: Utilities,
      protected messageService: MessageService) {}

    autoUpdateConfiguration(dataFlowId: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/${dataFlowId}/auto-update`, {});
    }

    getConfiguration(dataFlowId: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/${dataFlowId}`);
    }
}
