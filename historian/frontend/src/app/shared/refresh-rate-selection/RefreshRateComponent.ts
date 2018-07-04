import { OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription, Subject, interval, BehaviorSubject, timer } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Statement } from '@angular/compiler';

export abstract class RefreshRateComponent implements OnInit, OnDestroy, OnChanges {

    @Input() refreshRate: number; // milliseconds
    private resfreshChanges = new Subject<number>();
    private refreshChangesSubscription: Subscription;

    ngOnInit() {
        // initialize watch of stats with initial refreshrate
        this.refreshChangesSubscription = this.resfreshChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            // switch to new intervall observable each time it changes
            switchMap(period => timer(0, period)),
        ).subscribe(this.subscribeToRefreshChanges.bind(this));
        this.resfreshChanges.next(this.refreshRate);
    }

    abstract subscribeToRefreshChanges(t: number): void;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.refreshRate) {
            if (changes.refreshRate.currentValue !== changes.refreshRate.previousValue) {
                this.resfreshChanges.next(changes.refreshRate.currentValue);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.refreshChangesSubscription) this.refreshChangesSubscription.unsubscribe();
    }
}
