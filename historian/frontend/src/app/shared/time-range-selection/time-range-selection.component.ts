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
  timeRangeDisplay: string;
  view: string = 'Quick';
  private _from: Date = new Date(0);
  private _to: Date  = new Date();

  @Input() timeRange: TimeRangeFilter;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();

  onTimeRangeChange(newVal: TimeRangeFilter) {
    this.timeRange = newVal;
    this.timeRangeChange.emit(this.timeRange);
  }

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
    this.onTimeRangeChange({
      label: label,
      start: startMoment.valueOf().toString(),
      end: endMoment.valueOf().toString(),
    });
  }
}
