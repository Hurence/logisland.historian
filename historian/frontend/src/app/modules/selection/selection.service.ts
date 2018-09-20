import { Injectable } from '@angular/core';

import { AbstractModelService } from '../../shared/base-model-service';
import { TagsSelection, ITagsSelectionArray, TagsSelectionArray } from './Selection';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../../shared/utilities.service';
import { HistorianTag } from '../tag/modele/HistorianTag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class SelectionService extends AbstractModelService<TagsSelectionArray> {

  protected objNameForMsg: string = 'selection';

    constructor(protected http: HttpClient,
        protected help: Utilities,
        protected messageService: MessageService) {
        super(http, help, messageService, `${environment.HISTORIAN_API_BASE_URL}selections`);
    }

    getAllTagsFromSelection(selectionId: string): Observable<HistorianTag[]> {
      return this.http.get<HistorianTag[]>(`${this.baseUrl}/${selectionId}/tags`)
        .pipe(
          map(tags => tags.map(t => new HistorianTag(t))),
        );
    }

    protected create(item: TagsSelectionArray): TagsSelectionArray {
        return new TagsSelectionArray(item);
    }
}
