import { OnInit, OnDestroy, Input } from '@angular/core';
import { IHistorianTag } from '../modele/HistorianTag';
import { Measures } from '../../measure/Measures';
import { Subscription, Subject, interval } from 'rxjs';
import { MeasuresService } from '../../measure/measures.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

export abstract class BaseElementTagComponent implements OnInit, OnDestroy {

    @Input() tag: IHistorianTag;
    @Input() refreshRate: number; // milliseconds
    stats: Measures;
    statsUpdater: Subscription;
    lastRefreshed: Date;
    private resfreshStats = new Subject<Measures>();
    protected measuresService: MeasuresService;

    ngOnInit() {
        this.resfreshStats.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(400),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap(
                (stats: Measures) => {
                    this.stats = stats;
                    return 'stats';
                }
            ),
        ).subscribe();

        this.measuresService.getStat('series-A').subscribe(stats => {
            this.lastRefreshed = new Date();
            this.resfreshStats.next(stats);
        });

        this.statsUpdater = interval(this.refreshRate).subscribe(t => {
            this.lastRefreshed = new Date(); // TODO add a marker for loading
            this.measuresService.getStat('series-A').subscribe(stats => {
                this.resfreshStats.next(stats);
            });
        });
    }

    ngOnDestroy(): void {
        if (this.statsUpdater) this.statsUpdater.unsubscribe();
        if (this.resfreshStats) this.resfreshStats.unsubscribe();
    }
}
