import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { IHistorianTag } from '../../modele/HistorianTag';
import { Subscription, Observable, Subject } from 'rxjs';
import { interval } from 'rxjs/observable/interval';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tag-cell',
  templateUrl: './tag-cell.component.html',
  styleUrls: ['./tag-cell.component.css']
})
export class TagCellComponent implements OnInit, OnDestroy {

  @Input() tag: IHistorianTag;
  @Input() refreshRate: number; // milliseconds
  stats: Measures;
  statsUpdater: Subscription;
  lastRefreshed: Date;
  private resfreshStats = new Subject<Measures>();

  constructor(private measuresService: MeasuresService) { }

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
