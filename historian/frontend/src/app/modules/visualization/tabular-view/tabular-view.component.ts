import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../profil/profil.service';
import { TagsSelection } from '../../selection/Selection';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../../shared/refresh-rate-selection/auto-refresh-interval';

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent implements OnInit {

  autoRefreshInterval: AutoRefreshInterval = autoRefreshIntervalBuiltIn.TEN_SECONDS;
  refreshRate: number = 10000;

  constructor(public profilService: ProfilService) { }

  ngOnInit() {
  }

  onSelectionChanged(selection: TagsSelection) {
    this.profilService.currentTagsSelection = selection;
  }
}
