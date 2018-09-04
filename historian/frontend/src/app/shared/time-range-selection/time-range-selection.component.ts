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
    this.timeRangeOptions = Object.keys(timeRangeBuiltIn).map(key => {
      return {
        label: timeRangeBuiltIn[key].label,
        value: timeRangeBuiltIn[key],
      };
    });
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
