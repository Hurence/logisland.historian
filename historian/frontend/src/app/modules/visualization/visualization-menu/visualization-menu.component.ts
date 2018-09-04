import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { TagsSelection } from '../../selection/Selection';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.css']
})
export class VisualizationMenuComponent implements OnInit {

  private _refreshRate: number;
  @Output() refreshRateChange = new EventEmitter<number>();

  @Input()
  get refreshRate(): number {
    return this._refreshRate;
  }

  set refreshRate(newVal: number) {
    this._refreshRate = newVal;
    this.refreshRateChange.emit(this._refreshRate);
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

  constructor() { }


  ngOnInit() {
  }
}
