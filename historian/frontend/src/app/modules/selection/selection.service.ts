import { Injectable } from '@angular/core';

import { AbstractModelService } from '../../shared/base-model-service';
import { TagsSelection } from './Selection';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../../shared/utilities.service';

@Injectable()
export class SelectionService extends AbstractModelService<TagsSelection> {

    constructor(protected http: HttpClient,
        protected help: Utilities) {
        super(http, help, `${environment.HISTORIAN_API_URL}selections`);
    }

    protected create(): TagsSelection {
        return new TagsSelection();
    }
}
