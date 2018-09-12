import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AutoRefreshInterval } from '../../../shared/refresh-rate-selection/auto-refresh-interval';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { TagsSelection } from '../../selection/Selection';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.css']
})
export class VisualizationMenuComponent implements OnInit {

  menuItemActive: string = '';

  @Input() tagSelector?: boolean = true;
  @Input() autoRefreshIntervalSelector?: boolean = true;
  @Input() timeRangeSelector?: boolean = true;

  @Input() autoRefreshInterval: AutoRefreshInterval;
  @Output() autoRefreshIntervalChange = new EventEmitter<AutoRefreshInterval>();

  @Input() timeRange: TimeRangeFilter;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();

  @Input() tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();

  @Input() view: string;
  @Output() viewChange = new EventEmitter<string>();

  onAutoRefreshIntervalChanged(newVal: AutoRefreshInterval) {
    this.autoRefreshInterval = newVal;
    this.autoRefreshIntervalChange.emit(this.autoRefreshInterval);
    this.menuItemActive = '';
  }

  onTimeRangeChanged(newVal: TimeRangeFilter) {
    this.timeRange = newVal;
    this.timeRangeChange.emit(this.timeRange);
    this.menuItemActive = '';
  }

  ontagSelectionChanged(newVal: TagsSelection) {
    this.tagSelection = newVal;
    this.tagSelectionChange.emit(this.tagSelection);
  }

  onViewChanged(newVal: string) {
    this.view = newVal;
    this.viewChange.emit(this.view);
  }

  constructor() {}

  ngOnInit() {}

}
