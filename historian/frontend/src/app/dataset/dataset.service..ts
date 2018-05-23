import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Dataset } from './dataset';

@Injectable()
export class DatasetService {

    private myDataset: Dataset;

    constructor() {
        this.myDataset = new Dataset(1, 'mock data set', []);
    }

    getMyDataset(): Observable<Dataset> {
        return of(this.myDataset);
    }

}
