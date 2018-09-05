import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { TagsSelection } from '../../selection/Selection';
import { AutoRefreshInterval } from '../../../shared/refresh-rate-selection/auto-refresh-interval';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.css']
})
export class VisualizationMenuComponent implements OnInit {

  @Input() tagSelector?: boolean = true;
  @Input() autoRefreshIntervalSelector?: boolean = true;
  @Input() timeRangeSelector?: boolean = true;

  private _autoRefreshInterval: AutoRefreshInterval;
  @Output() autoRefreshIntervalChange = new EventEmitter<AutoRefreshInterval>();

  @Input()
  get autoRefreshInterval(): AutoRefreshInterval {
    return this._autoRefreshInterval;
  }

  set autoRefreshInterval(newVal: AutoRefreshInterval) {
    this._autoRefreshInterval = newVal;
    this.autoRefreshIntervalChange.emit(this._autoRefreshInterval);
    this.menuItemActive = '';
  }

  private _timeRange: TimeRangeFilter;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();

  @Input()
  get timeRange(): TimeRangeFilter {
    return this._timeRange;
  }

  set timeRange(newVal: TimeRangeFilter) {
    this._timeRange = newVal;
    this.timeRangeChange.emit(this._timeRange);
    this.menuItemActive = '';
  }

  private _tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();

  get tagSelection(): TagsSelection {
    return this._tagSelection;
  }

  set tagSelection(newVal: TagsSelection) {
    this._tagSelection = newVal;
    this.tagSelectionChange.emit(this._tagSelection);
  }

  menuItemActive: string = '';

  constructor() { }

  ngOnInit() {
  }
}
