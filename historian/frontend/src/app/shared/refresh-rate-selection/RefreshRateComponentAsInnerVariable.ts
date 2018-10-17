import { OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription, Subject, timer } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

export abstract class RefreshRateComponentAsInnerVariable implements OnInit, OnDestroy {

    private refreshRate: number; // milliseconds
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

    protected changeRefreshRate(refreshRate: number) {
      this.refreshRate = refreshRate;
      if (this.refreshChangesSubscription) {
        if (refreshRate === undefined) {
          this.refreshChangesSubscription.unsubscribe();
        } else {
          this.resfreshChanges.next(refreshRate);
        }
      }
    }

    ngOnDestroy(): void {
        if (this.refreshChangesSubscription) this.refreshChangesSubscription.unsubscribe();
    }
}
