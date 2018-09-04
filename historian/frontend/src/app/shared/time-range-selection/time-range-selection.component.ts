import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TimeRangeFilter, timeRangeBuiltIn } from './time-range-filter';
import * as moment from 'moment';

@Component({
  selector: 'app-time-range-selection',
  templateUrl: './time-range-selection.component.html',
  styleUrls: ['./time-range-selection.component.css']
})
export class TimeRangeSelectionComponent implements OnInit {

  timeRangeOptions: SelectItem[];
  private _timeRange: TimeRangeFilter;
  timeRangeDisplay: string;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();
  view: string = 'Quick';
  private _from: Date = new Date(0);
  private _to: Date  = new Date();

  constructor() { }

  get from(): Date {
    return this._from;
  }

  set from(newVal: Date) {
    if (!newVal) {
      this._from = new Date(0);
    } else {
      this._from = newVal;
    }
  }

  get to(): Date {
    return this._to;
  }

  set to(newVal: Date) {
    if (newVal === null) {
      this._to = new Date();
    }
    this._to = newVal;
  }

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
      {label: 'Today', value: timeRangeBuiltIn.TODAY},
      // {label: 'This week', start: 'NOW/WEEK', end: 'NOW+1WEEK/WEEK'},
      {label: 'This month', value: {label: 'This month', start: 'NOW/MONTH', end: 'NOW+1MONTH/MONTH'}},
      {label: 'This year', value: {label: 'This year', start: 'NOW/YEAR', end: 'NOW+1YEAR/YEAR'}},
      {label: 'The day so far', value: {label: 'The day so far', start: 'NOW/DAY', end: 'NOW'}},
      // {label: 'Week to date', start: 'NOW/WEEK', end: 'NOW'},
      {label: 'Month to date', value: {label: 'Month to date', start: 'NOW/MONTH', end: 'NOW'}},
      {label: 'Year to date', value: {label: 'Year to date', start: 'NOW/YEAR', end: 'NOW'}}, // yyyy-mm-ddThh:mm:ss.mmmZ
      {label: 'Yesterday', value: {label: 'Yesterday', start: 'NOW-1DAY/DAY', end: 'NOW/DAY'}},
      {label: 'Day before yesterday', value: {label: 'Day before yesterday', start: 'NOW-2DAYS/DAY', end: 'NOW-1DAY/DAY'}},
      {label: 'This day last week', value: {label: 'This day last week', start: 'NOW-7DAYS/DAY', end: 'NOW-6DAYS/DAY'}},
      // {label: 'Previous week', start: 'NOW-1WEEK/WEEK', end: 'NOW/WEEK'},
      {label: 'Previous month', value: {label: 'Previous month', start: 'NOW-1MONTH/MONTH', end: 'NOW/MONTH'}},
      {label: 'Previous year', value: {label: 'Previous year', start: 'NOW-1YEAR/YEAR', end: 'NOW/YEAR'}},
      {label: 'Last 15 minutes', value: {label: 'Last 15 minutes', start: 'NOW-15MINUTES', end: 'NOW'}},
      {label: 'Last 30 minutes', value: {label: 'Last 30 minutes', start: 'NOW-30MINUTES', end: 'NOW'}},
      {label: 'Last 1 hour', value: {label: 'Last 1 hour', start: 'NOW-1HOUR', end: 'NOW'}},
      {label: 'Last 4 hours', value: {label: 'Last 4 hours', start: 'NOW-4HOURS', end: 'NOW'}},
      {label: 'Last 12 hours', value: {label: 'Last 12 hours', start: 'NOW-12HOURS', end: 'NOW'}},
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

  setCustomTimeRange(): void {
    let startMoment: moment.Moment;
    let endMoment: moment.Moment;
    let label = '';
    if (this.from) {
      startMoment = moment(this.from);
      label = startMoment.utc().format(`YYYY-MM-DDThh:mm:ssZ`);
    }
    if (this.to) {
      endMoment = moment(this.to);
      label += ' to ' + endMoment.utc().format(`YYYY-MM-DDThh:mm:ssZ`);
    }
    this.timeRange = {
      label: label,
      start: startMoment.valueOf().toString(),
      end: endMoment.valueOf().toString(),
    };
  }
}
