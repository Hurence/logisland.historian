import { OnDestroy, OnInit, Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ProfilService } from '../../profil/profil.service';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../shared/refresh-rate-selection/auto-refresh-interval';
import { timeRangeBuiltIn, TimeRangeFilter } from '../../shared/time-range-selection/time-range-filter';
import { SelectionService } from '../selection/selection.service';
import { HistorianTag } from '../tag/modele/HistorianTag';
import { TagsSelection } from '../selection/Selection';

@Component({  
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnDestroy {

  tagSelectionId: string;
  view: string;
  viewSubscription$: Subscription;
  tagsSelection$: Observable<TagsSelection>;
  tags: HistorianTag[] = [];
  autoRefreshInterval: AutoRefreshInterval = autoRefreshIntervalBuiltIn.TEN_SECONDS;
  timeRange: TimeRangeFilter = timeRangeBuiltIn.LAST_15_MINUTES;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private selectionService: SelectionService,
              public profilService: ProfilService) {}

  ngOnInit() {
    this.viewSubscription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.view = params.get('view');
        return Observable.of({});
      })
    ).subscribe();
    this.tagsSelection$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.view = params.get('view');
        this.tagSelectionId = params.get('selectionId');
        if (params.has('selectionId')) {
          return this.selectionService.get(this.tagSelectionId).pipe(
            map(t => new TagsSelection(t)),
          );
        } else {
          return Observable.of(null);
        }
      }),
      tap(selection => {
        if (selection) {
          this.selectionService.getAllTagsFromSelection(selection.name).subscribe(tags => {
            this.tags = tags;
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.viewSubscription$) {
      this.viewSubscription$.unsubscribe();
    }
  }

  onViewChanged(view: string): void {
    this.view = view;
    this.navigateLocal();
  }

  onSelectionChanged(selection: TagsSelection) {
    this.tagSelectionId = selection ? selection.name : null;
    this.navigateLocal();
  }

  private navigateLocal(): void {
    this.router.navigate(['./', { view: this.view, selectionId: this.tagSelectionId }]);
  }
}
