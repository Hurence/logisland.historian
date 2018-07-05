import { Injectable } from '@angular/core';

import { AbstractModelService } from '../../shared/base-model-service';
import { TagsSelection, ITagsSelectionArray, TagsSelectionArray } from './Selection';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../../shared/utilities.service';

@Injectable()
export class SelectionService extends AbstractModelService<TagsSelectionArray> {

    constructor(protected http: HttpClient,
        protected help: Utilities) {
        super(http, help, `${environment.HISTORIAN_API_URL}selections`);
    }

    protected create(item: TagsSelectionArray): TagsSelectionArray {
        return new TagsSelectionArray(item);
    }
}
