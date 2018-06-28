import { OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IHistorianTag } from '../modele/HistorianTag';
import { Measures } from '../../../measure/Measures';
import { Subscription, Subject, interval } from 'rxjs';
import { MeasuresService } from '../../../measure/measures.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Statement } from '@angular/compiler';

export abstract class BaseElementTagComponent implements OnInit, OnDestroy, OnChanges {

    @Input() tag: IHistorianTag;
    @Input() refreshRate: number; // milliseconds
    stats: Measures;
    lastRefreshed: Date;
    notFound: boolean;
    private resfreshStats = new Subject<number>();
    private initSubscription: Subscription;
    private refreshSubscription: Subscription;
    protected measuresService: MeasuresService;

    ngOnInit() {
        this.notFound = false;
        // initialize stat
        this.initSubscription = this.measuresService.getStat(this.tag.id).subscribe(
            stats => {
                this.lastRefreshed = new Date();
                this.notFound = false;
                this.stats = stats;
            },
            error => {
                if (error.status === 404) {
                    this.notFound = true;
                }
            }
        );
        // initialize watch of stats with initial refreshrate
        this.refreshSubscription = this.resfreshStats.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            // switch to new intervall observable each time it changes
            switchMap(period => interval(period)),
        ).subscribe(
            (t) => {
                this.lastRefreshed = new Date(); // TODO add a marker for loading
                this.notFound = false;
                this.measuresService.getStat(this.tag.id).subscribe(
                    stats => {
                        this.stats = stats;
                    },
                    error => {
                        if (error.status === 404) {
                            this.notFound = true;
                        }
                    }
                );
            }
        );
        this.resfreshStats.next(this.refreshRate);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.refreshRate) {
            if (changes.refreshRate.currentValue !== changes.refreshRate.previousValue) {
                this.resfreshStats.next(changes.refreshRate.currentValue);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.initSubscription) this.initSubscription.unsubscribe();
        if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
    }
}
