import { OnDestroy, OnInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ProfilService } from '../../profil/profil.service';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../shared/refresh-rate-selection/auto-refresh-interval';
import { timeRangeBuiltIn, TimeRangeFilter } from '../../shared/time-range-selection/time-range-filter';
import { SelectionService } from '../selection/selection.service';
import { HistorianTag } from '../tag/modele/HistorianTag';
import { TagsSelection } from '../selection/Selection';
import { CookieService } from 'ngx-cookie-service';
import { TreeNode } from 'primeng/api';
import { NgTreenodeService } from '../tag/service/ng-treenode.service';
import { HistorianTagTreeComponent } from '../tag/tag-tree/historian-tag-tree/historian-tag-tree.component';

@Component({
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  @ViewChild(HistorianTagTreeComponent)
  private treeTag: HistorianTagTreeComponent;

  paramSubscription$: Subscription;
  tagsSelection$: Observable<TagsSelection>;
  currentTagsSelection: TagsSelection;
  tags: HistorianTag[] = [];
  treeNodes$: Observable<TreeNode[]>;

  private _tagSelectionId: string;
  get tagSelectionId(): string {
    if (this._tagSelectionId) return this._tagSelectionId;
    if (this.cookieService.check('tagSelectionId')) return this.cookieService.get('tagSelectionId');
    return null;
  }

  set tagSelectionId(newTagSelectionId: string) {
    this._tagSelectionId = newTagSelectionId;
    this.cookieService.set('tagSelectionId', this._tagSelectionId);
  }

  private _autoRefreshInterval: AutoRefreshInterval;
  get autoRefreshInterval(): AutoRefreshInterval {
    if (this._autoRefreshInterval) return this._autoRefreshInterval;
    if (this.cookieService.check('autoRefreshInterval')) return JSON.parse(this.cookieService.get('autoRefreshInterval'));
    return autoRefreshIntervalBuiltIn.TEN_SECONDS;
  }

  set autoRefreshInterval(newAutoRefreshInterval: AutoRefreshInterval) {
    this._autoRefreshInterval = newAutoRefreshInterval;
    this.cookieService.set('autoRefreshInterval', JSON.stringify(this._autoRefreshInterval));
  }

  private _timeRange: TimeRangeFilter;
  get timeRange(): TimeRangeFilter {
    if (this._timeRange) return this._timeRange;
    if (this.cookieService.check('timeRange')) return JSON.parse(this.cookieService.get('timeRange'));
    return timeRangeBuiltIn.LAST_15_MINUTES;
  }

  set timeRange(newTimeRange: TimeRangeFilter) {
    this._timeRange = newTimeRange;
    this.cookieService.set('timeRange', JSON.stringify(this._timeRange));
  }

  private _view: string;
  get view(): string {
    if (this._view) return this._view;
    if (this.cookieService.check('view')) return this.cookieService.get('view');
    return 'tabular';
  }

  set view(newView: string) {
    this._view = newView;
    this.cookieService.set('view', this._view);
  }
  treeNodesSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private selectionService: SelectionService,
              private ngTreenodeService: NgTreenodeService,
              private cookieService: CookieService) {}

  ngOnInit() {
    this.treeNodes$ = this.ngTreenodeService.getHistTagTree();
    this.tagsSelection$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has('view')) {
          this.view = params.get('view');
        }
        if (params.has('timeRange')) {
          this.timeRange = JSON.parse(params.get('timeRange'));
        }
        if (params.has('autoRefreshInterval')) {
          this.autoRefreshInterval = JSON.parse(params.get('autoRefreshInterval'));
        }
        if (params.has('selectionId')) {
          this.tagSelectionId = params.get('selectionId');
        }
        if (this.tagSelectionId && (!this.currentTagsSelection || this.currentTagsSelection.name !== this.tagSelectionId)) {
          if (this.treeTag) {
            this.treeTag.loading = true;
          }          
          return this.selectionService.get(this.tagSelectionId).pipe(
            map(t => {
              this.currentTagsSelection = new TagsSelection(t);      
              console.log('loading selection', this.currentTagsSelection);                      
              this.selectionService.getAllTagsFromSelection(this.currentTagsSelection.name).subscribe(tags => {
                if (this.treeTag) {
                  this.treeTag.loading = false;                
                }                
                this.tags = tags;
              });
              return this.currentTagsSelection;              
            })
          );
        } else {
          return Observable.of(this.currentTagsSelection);
        }
      }),
    );
  }

  // ngOnDestroy() {
  //   if (this.treeNodesSubscription && !this.treeNodesSubscription.closed) {
  //     this.treeNodesSubscription.unsubscribe();
  //   }
  // }

  onViewChanged(view: string): void {
    if (view !== this.view) {
      this.view = view;
      this.navigateLocal();
    }
  }

  onSelectionChanged(selection: TagsSelection): void {
    if (selection && selection.name !== this.tagSelectionId) {
      this.tagSelectionId = selection.name;
      this.navigateLocal();
    }
  }

  onTimeRangeChanged(timeRange: TimeRangeFilter): void {
    if (timeRange.start !== this.timeRange.start || timeRange.end !== this.timeRange.end) {
      this.timeRange = timeRange;
      this.navigateLocal();
    }
  }

  onAutoRefreshIntervalChanged(autoRefreshInterval: AutoRefreshInterval): void {
    if (autoRefreshInterval.refrashInterval !== this.autoRefreshInterval.refrashInterval) {
      this.autoRefreshInterval = autoRefreshInterval;
      this.navigateLocal();
    }
  }

  private navigateLocal(): void {
    console.log('navigate', {
      view: this.view,
      selectionId: this.tagSelectionId,
      timeRange: JSON.stringify(this.timeRange),
      autoRefreshInterval: JSON.stringify(this.autoRefreshInterval)
    });
    this.router.navigate(['./', {
      view: this.view,
      selectionId: this.tagSelectionId,
      timeRange: JSON.stringify(this.timeRange),
      autoRefreshInterval: JSON.stringify(this.autoRefreshInterval)
    }]);
  }
}
