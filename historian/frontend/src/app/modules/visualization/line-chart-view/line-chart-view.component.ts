import { Component, OnInit } from '@angular/core';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { ProfilService } from '../../../profil/profil.service';
import { TagsSelection } from '../../selection/Selection';

@Component({
  selector: 'app-line-chart-view',
  templateUrl: './line-chart-view.component.html',
  styleUrls: ['./line-chart-view.component.css']
})
export class LineChartViewComponent implements OnInit {

  refreshRate: number = 10000;
  timeRange: TimeRangeFilter = { start: 'NOW-15MINUTES', end: 'NOW' };

  constructor(public profilService: ProfilService) { }

  ngOnInit() {
  }

  onSelectionChanged(selection: TagsSelection) {
    this.profilService.currentTagsSelection = selection;
  }

}
