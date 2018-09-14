import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TreeNode } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../shared/refresh-rate-selection/auto-refresh-interval';
import { timeRangeBuiltIn, TimeRangeFilter, TimeRangeFilterUtils } from '../../shared/time-range-selection/time-range-filter';
import { TagsSelection } from '../selection/Selection';
import { SelectionService } from '../selection/selection.service';
import { HistorianTag } from '../tag/modele/HistorianTag';
import { NgTreenodeService } from '../tag/service/ng-treenode.service';
import { HistorianTagTreeComponent } from '../tag/tag-tree/historian-tag-tree/historian-tag-tree.component';

@Component({
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnDestroy {

  @ViewChild(HistorianTagTreeComponent)
  private treeTag: HistorianTagTreeComponent;

  paramSubscription: Subscription;
  treeNodesSubscription: Subscription;

  tagsSelection$: Observable<TagsSelection>;
  currentTagsSelection: TagsSelection;
  tags: HistorianTag[] = [];
  treeNodes: TreeNode[];
  loading: boolean = false;
  loadingTree: boolean = false;

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private selectionService: SelectionService,
              private ngTreenodeService: NgTreenodeService,
              private cookieService: CookieService) {}

  ngOnInit() {
    if (!this.treeNodes && !this.loadingTree) {
      this.loadingTree = true;
      this.treeNodesSubscription = this.ngTreenodeService.getHistTagTree().subscribe(
        treeNodes => {
          this.treeNodes = treeNodes;
          this.loadingTree = false;
        },
        e => {
          console.error('error loading historian tag tree', e);
          this.loadingTree = false;
        },
      );
    }
    if (this.paramSubscription && !this.paramSubscription.closed) {
      this.paramSubscription.unsubscribe();
    }
    this.paramSubscription = this.route.paramMap.pipe(
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
        if (this.tagSelectionId && this.tagSelectionId !== 'null' &&
            (!this.currentTagsSelection || this.currentTagsSelection.name !== this.tagSelectionId)) {
          if (this.treeTag) {
            this.treeTag.loading = true;
          }
          console.log('loading selection', this.tagSelectionId);
          return this.selectionService.get(this.tagSelectionId).pipe(
            map(s => {
              this.currentTagsSelection = new TagsSelection(s);
              return this.currentTagsSelection;
            })
          );
        } else {
          return Observable.of(this.currentTagsSelection);
        }
      }),
      map(selection => {
        console.log('loading tags of ', selection);
        if (selection) {
          this.loading = true;
          this.selectionService.getAllTagsFromSelection(selection.name).subscribe(tags => {
            if (this.treeTag) {
              this.treeTag.loading = false;
            }
            this.tags = tags;
          });
        }
        return selection;
      })
    ).subscribe(
      s => { this.loading = false; },
      e => {
        console.error('error while navigating', e);
        this.loading = false;
      },
    );
  }

  ngOnDestroy() {
    if (this.treeNodesSubscription && !this.treeNodesSubscription.closed) {
      this.treeNodesSubscription.unsubscribe();
    }
    if (this.paramSubscription && !this.paramSubscription.closed) {
      this.paramSubscription.unsubscribe();
    }
  }

  onViewChanged(view: string): void {
    if (view !== this.view) {
      this.view = view;
      this.navigateLocal();
    }
  }

  onSelectionChanged(selection: TagsSelection): void {
    if (selection && selection.name !== this.tagSelectionId) {
      this.tagSelectionId = selection.name;
      this.currentTagsSelection = selection;
      this.navigateLocal();
    }
  }

  onTimeRangeChanged(timeRange: TimeRangeFilter): void {
    if (!TimeRangeFilterUtils.equals(timeRange, this.timeRange)) {
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

  onRemoveTag(tag: HistorianTag) {
    this.currentTagsSelection.removeTag(tag.id);
  }

  onAddTag(tag: HistorianTag) {
    this.currentTagsSelection.addTag(tag.id);
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
