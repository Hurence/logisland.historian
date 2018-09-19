import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../shared/refresh-rate-selection/auto-refresh-interval';
import { timeRangeBuiltIn, TimeRangeFilter, TimeRangeFilterUtils } from '../../shared/time-range-selection/time-range-filter';
import { TagsSelection, ITagsSelection } from '../selection/Selection';
import { SelectionService } from '../selection/selection.service';
import { HistorianTag } from '../tag/modele/HistorianTag';
import { NgTreenodeService } from '../tag/service/ng-treenode.service';
import { HistorianTagTreeComponent } from '../tag/tag-tree/historian-tag-tree/historian-tag-tree.component';
import { LineChartComponent } from '../graph/line-chart/line-chart.component';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';

@Component({
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnDestroy {

  @ViewChild(HistorianTagTreeComponent)
  private treeTag: HistorianTagTreeComponent;

  @ViewChild(LineChartComponent)
  private lineChart: LineChartComponent;

  @ViewChild(VisualizationMenuComponent)
  private menu: VisualizationMenuComponent;

  paramSubscription: Subscription;
  treeNodesSubscription: Subscription;

  tagsSelection$: Observable<TagsSelection>;
  tags: HistorianTag[] = [];
  treeNodes: TreeNode[];
  loadingTags: boolean = false;
  loadingTree: boolean = false;

  private tagSlectionIsClean: boolean = true;

  private _currentTagsSelection: TagsSelection;
  get currentTagsSelection(): TagsSelection {
    return this._currentTagsSelection;
  }

  set currentTagsSelection(selection: TagsSelection) {
    this._currentTagsSelection = selection;
    this.tagSlectionIsClean = true;
  }

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
              private cookieService: CookieService,
              protected confirmationService: ConfirmationService) {}

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
        this.loadingTags = true;
        if (params.has('view')) {
          this.view = params.get('view');
        }
        if (params.has('timeRange')) {
          this.timeRange = JSON.parse(params.get('timeRange'));
        }
        if (params.has('autoRefreshInterval')) {
          this.autoRefreshInterval = JSON.parse(params.get('autoRefreshInterval'));
        }
        return this.handleNewSelectionId(params).pipe(
          tap(s => {
            this.currentTagsSelection = s;
            if (this.currentTagsSelection) {
              this.tagSelectionId = this.currentTagsSelection.name;
            } else {
              this.tagSelectionId = null;
            }
          })
        );
      })
    ).subscribe(
      s => { this.loadingTags = false; },
      e => {
        console.error('error while navigating', e);
        this.loadingTags = false;
      },
    );
  }

  private handleNewSelectionId(params: ParamMap): Observable<TagsSelection> {
    if (params.has('selectionId') && params.get('selectionId') !== 'null') {
      const newSelectionId = params.get('selectionId');
      if (!this.currentTagsSelection || newSelectionId !== this.tagSelectionId) {
        // happen when user modify url
        console.log('selection not initialized or selection asked not same than current');
        return this.updateTagsForSelection(this.getSelection(newSelectionId));
      } else {
        // happen when user change selection
        console.log('same selection selected change nothing');
        return Observable.of(this.currentTagsSelection);
      }
    } else {
      if (this.tagSelectionId && this.tagSelectionId !== 'null') { // if not specified in url but in cache
        // this.navigateLocal({ tagSelectionId : this.tagSelectionId });
        if (this.currentTagsSelection) {
          // should not happen because we doe not cache selection
          console.log('initialize selection with cookie but already got selection (should not happen)');
          return this.updateTagsForSelection(Observable.of(this.currentTagsSelection));
        } else {
          // happen when user navigate to this page from another one (without specifying tagSelectionId)
          console.log('initialize selection with cookie');
          return this.updateTagsForSelection(this.getSelection(this.tagSelectionId));
        }
      } else {
        // happen when there is no caches tagSelectionId
        console.log('no selection selected');
        return Observable.of(this.currentTagsSelection); // NO SELECTION SELECTED
      }
    }
  }

  private getSelection(selectionId: string): Observable<TagsSelection> {
    return this.selectionService.get(selectionId).pipe(
      map(s => {
        if (s) {
          return new TagsSelection(s);
        }
        return null;
      })
    );
  }

  private updateTagsForSelection(selection$: Observable<TagsSelection>): Observable<TagsSelection> {
    return selection$.pipe(
      map(s => {
        if (s) {
          const selection = new TagsSelection(s);
          console.log('loading tags of ', selection);
          this.selectionService.getAllTagsFromSelection(selection.name).subscribe(tags => {
            // unsubscribe when not executed but changed
            this.tags = tags;
            if (this.treeTag) {
              this.treeTag.loading = false;
            }
          });
          return selection;
        }
        return null;
      })
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
      if (this.tagSlectionIsClean) {
        this.changeSelection(selection);
      } else {
        this.confirmationService.confirm({
          message: `You did not save your modification on current tag selection. Click Ok if you do not care,
                    otherwise click cancel then click on update in selection menu.`,
          header: 'Confirmation',
          rejectLabel: 'Cancel',
          acceptLabel: 'Ok',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.changeSelection(selection);
          },
          reject: () => {
            // workaround as p-dropdown seems bugged see : https://github.com/primefaces/primeng/issues/877
            this.menu.setDashboardDropDownValue(this.currentTagsSelection);
          }
        });
      }
    }
  }

  onSelectionUpdated(selection: TagsSelection): void {
    this.tagSlectionIsClean = true;
  }

  private changeSelection(newSelection: TagsSelection): void {
    this.currentTagsSelection = newSelection;
    this.navigateLocal({
      tagSelectionId: newSelection.name
    });
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
    this.tagSlectionIsClean = false;
    if (this.lineChart) {
      this.lineChart.dynamicallyRemoveTag(tag);
    }
  }

  onAddTag(tag: HistorianTag) {
    this.currentTagsSelection.addTag(tag.id);
    this.tagSlectionIsClean = false;
    if (this.lineChart) {
      this.lineChart.dynamicallyAddTag(tag);
    }
  }

  private navigateLocal(param ?: {
    view ?: string,
    tagSelectionId ?: string,
    timeRange ?: TimeRangeFilter,
    autoRefreshInterval ?: AutoRefreshInterval
  }): void {
    if (param) {
      this.router.navigate(['./', {
        view: param.view || this.view,
        selectionId: param.tagSelectionId || this.tagSelectionId,
        timeRange: JSON.stringify(param.timeRange || this.timeRange),
        autoRefreshInterval: JSON.stringify(param.autoRefreshInterval || this.autoRefreshInterval)
      }]);
    } else {
      this.router.navigate(['./', {
        view: this.view,
        selectionId: this.tagSelectionId,
        timeRange: JSON.stringify(this.timeRange),
        autoRefreshInterval: JSON.stringify(this.autoRefreshInterval)
      }]);
    }
  }
}
