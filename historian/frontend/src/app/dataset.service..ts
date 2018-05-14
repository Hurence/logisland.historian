import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Dataset } from './dataset';

@Injectable()
export class DatasetService {

    myDataset: Dataset;

    constructor() {
        this.myDataset = new Dataset(1, 'mock data set', []);
    }

    getMyDataset(): Observable<Dataset> {
        return of(this.myDataset);
    }

}
