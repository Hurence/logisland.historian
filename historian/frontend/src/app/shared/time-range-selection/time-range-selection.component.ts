import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TimeRangeFilter } from '../../modules/graph/line-chart/line-chart.component';

@Component({
  selector: 'app-time-range-selection',
  templateUrl: './time-range-selection.component.html',
  styleUrls: ['./time-range-selection.component.css']
})
export class TimeRangeSelectionComponent implements OnInit {

  timeRangeOptions: SelectItem[];
  private _timeRange: TimeRangeFilter;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();

  constructor() { }

  @Input()
  get timeRange(): TimeRangeFilter {
    return this._timeRange;
  }

  set timeRange(newVal: TimeRangeFilter) {
    this._timeRange = newVal;
    this.timeRangeChange.emit(this._timeRange);
  }

  ngOnInit() {
    this.timeRangeOptions = [
      {label: 'Today', value: {start: 'NOW/DAY', end: 'NOW+1DAY/DAY'}},
      // {label: 'This week', start: 'NOW/WEEK', end: 'NOW+1WEEK/WEEK'},
      {label: 'This month', value: {start: 'NOW/MONTH', end: 'NOW+1MONTH/MONTH'}},
      {label: 'This year', value: {start: 'NOW/YEAR', end: 'NOW+1YEAR/YEAR'}},
      {label: 'The day so far', value: {start: 'NOW/DAY', end: 'NOW'}},
      // {label: 'Week to date', start: 'NOW/WEEK', end: 'NOW'},
      {label: 'Month to date', value: {start: 'NOW/MONTH', end: 'NOW'}},
      {label: 'Year to date', value: {start: 'NOW/YEAR', end: 'NOW'}}, // yyyy-mm-ddThh:mm:ss.mmmZ
      {label: 'Yesterday', value: {start: 'NOW-1DAY/DAY', end: 'NOW/DAY'}},
      {label: 'Day before yesterday', value: {start: 'NOW-2DAYS/DAY', end: 'NOW-1DAY/DAY'}},
      {label: 'This day last week', value: {start: 'NOW-7DAYS/DAY', end: 'NOW-6DAYS/DAY'}},
      // {label: 'Previous week', start: 'NOW-1WEEK/WEEK', end: 'NOW/WEEK'},
      {label: 'Previous month', value: {start: 'NOW-1MONTH/MONTH', end: 'NOW/MONTH'}},
      {label: 'Previous year', value: {start: 'NOW-1YEAR/YEAR', end: 'NOW/YEAR'}},
      {label: 'Last 15 minutes', value: {start: 'NOW-15MINUTES', end: 'NOW'}},
      {label: 'Last 30 minutes', value: {start: 'NOW-30MINUTES', end: 'NOW'}},
      {label: 'Last 1 hour', value: {start: 'NOW-1HOUR', end: 'NOW'}},
      {label: 'Last 4 hours', value: {start: 'NOW-4HOURS', end: 'NOW'}},
      {label: 'Last 12 hours', value: {start: 'NOW-12HOURS', end: 'NOW'}},
      {label: 'Last 24 hours', value: {start: 'NOW-24HOURS', end: 'NOW'}},
      {label: 'Last 7 days', value: {start: 'NOW-7DAYS', end: 'NOW'}},
      {label: 'Last 30 days', value: {start: 'NOW-30DAYS', end: 'NOW'}},
      {label: 'Last 60 days', value: {start: 'NOW-60DAYS', end: 'NOW'}},
      {label: 'Last 90 days', value: {start: 'NOW-90DAYS', end: 'NOW'}},
      {label: 'Last 6 months', value: {start: 'NOW-6MONTHS', end: 'NOW'}},
      {label: 'Last 1 year', value: {start: 'NOW-1YEAR', end: 'NOW'}},
      {label: 'Last 2 years', value: {start: 'NOW-2YEARS', end: 'NOW'}},
      {label: 'Last 5 year', value: {start: 'NOW-5YEARS', end: 'NOW'}}
    ];
  }
}
