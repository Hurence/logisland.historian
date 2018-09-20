import { Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { RefreshRateComponent } from '../../../shared/refresh-rate-selection/RefreshRateComponent';
import { IHistorianTag } from '../modele/HistorianTag';

export abstract class BaseElementTagComponent extends RefreshRateComponent implements OnInit, OnDestroy, OnChanges {

    @Input() tag: IHistorianTag;
    stats: Measures;
    lastRefreshed: Date;
    notFound: boolean;
    protected measuresService: MeasuresService;

    subscribeToRefreshChanges(t: number): void {
        this.measuresService.getStat(this.tag.id).subscribe(
            stats => {
                this.lastRefreshed = new Date();
                this.stats = stats;
            },
            error => {
                if (error.status === 404) {
                    this.notFound = true;
                }
            }
        );
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
