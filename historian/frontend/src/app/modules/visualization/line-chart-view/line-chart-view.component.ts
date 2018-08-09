import { Component, OnInit } from '@angular/core';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';

@Component({
  selector: 'app-line-chart-view',
  templateUrl: './line-chart-view.component.html',
  styleUrls: ['./line-chart-view.component.css']
})
export class LineChartViewComponent implements OnInit {

  refreshRate: number = 10000;
  timeRange: TimeRangeFilter = { start: 'NOW-15MINUTES', end: 'NOW' };

  constructor() { }

  ngOnInit() {
  }

}
