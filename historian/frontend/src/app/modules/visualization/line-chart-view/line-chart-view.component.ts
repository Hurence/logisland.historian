import { Component, OnInit } from '@angular/core';
import { TimeRangeFilter, timeRangeBuiltIn } from '../../../shared/time-range-selection/time-range-filter';
import { ProfilService } from '../../../profil/profil.service';
import { TagsSelection } from '../../selection/Selection';
import { autoRefreshIntervalBuiltIn, AutoRefreshInterval } from '../../../shared/refresh-rate-selection/auto-refresh-interval';

@Component({
  selector: 'app-line-chart-view',
  templateUrl: './line-chart-view.component.html',
  styleUrls: ['./line-chart-view.component.css']
})
export class LineChartViewComponent implements OnInit {

  autoRefreshInterval: AutoRefreshInterval = autoRefreshIntervalBuiltIn.TEN_SECONDS;
  timeRange: TimeRangeFilter = timeRangeBuiltIn.LAST_15_MINUTES;

  constructor(public profilService: ProfilService) { }

  ngOnInit() {
  }

  onSelectionChanged(selection: TagsSelection) {
    this.profilService.currentTagsSelection = selection;
  }

}
