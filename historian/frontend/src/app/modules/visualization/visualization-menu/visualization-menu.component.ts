import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AutoRefreshInterval } from '../../../shared/refresh-rate-selection/auto-refresh-interval';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { TagsSelection } from '../../selection/Selection';
import { ProfilService } from '../../../profil/profil.service';
import { SelectionDashboardComponent } from '../../selection/selection-dashboard/selection-dashboard.component';
import { Dashboard } from '../../../core/modele/dashboard/Dashboard';
import { DashboardSelectionComponent } from '../../dashboard/dashboard-selection/dashboard-selection.component';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.css']
})
export class VisualizationMenuComponent implements OnInit {

  menuItemActive: string = '';

  @Input() tagSelector?: boolean = false;
  @Input() dashboardSelector?: boolean = false;
  @Input() autoRefreshIntervalSelector?: boolean = false;
  @Input() timeRangeSelector?: boolean = false;
  @Input() viewSelector?: boolean = false;

  @Input() autoRefreshInterval: AutoRefreshInterval;
  @Output() autoRefreshIntervalChange = new EventEmitter<AutoRefreshInterval>();

  @Input() timeRange: TimeRangeFilter;
  @Output() timeRangeChange = new EventEmitter<TimeRangeFilter>();

  @Input() tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();
  @Output() tagSelectionUpdated = new EventEmitter<TagsSelection>();

  @Input() dashboard: Dashboard;
  @Output() dashboardChange = new EventEmitter<Dashboard>();
  @Output() dashboardUpdated = new EventEmitter<Dashboard>();

  @Input() view: string;
  @Output() viewChange = new EventEmitter<string>();

  @Input() dashboardSaving: boolean = false;
  @Output() gaugeAdded = new EventEmitter();
  @Output() dashboardSaved = new EventEmitter<Dashboard>();

  @Output() dashboardChangeAfterDelete = new EventEmitter<Dashboard>();


  @ViewChild(SelectionDashboardComponent)
  private selectionDashboardComp: SelectionDashboardComponent;

  @ViewChild(DashboardSelectionComponent)
  private dashboardSelectionComponent: DashboardSelectionComponent;

  onAutoRefreshIntervalChanged(newVal: AutoRefreshInterval) {
    this.autoRefreshIntervalChange.emit(newVal);
    this.menuItemActive = '';
  }

  onTimeRangeChanged(newVal: TimeRangeFilter) {
    this.timeRangeChange.emit(newVal);
    this.menuItemActive = '';
  }

  onTagSelectionChanged(newVal: TagsSelection) {
    this.tagSelectionChange.emit(newVal);
  }

  onTagSelectionUpdated(updatedVal: TagsSelection) {
    this.tagSelectionUpdated.emit(updatedVal);
  }

  onDashboardChanged(newVal: Dashboard) {
    this.dashboardChange.emit(newVal);
    this.menuItemActive = '';
  }

  onDashboardChangedAfterDelete(dashboard: Dashboard): void {
    this.dashboardChangeAfterDelete.emit(dashboard);
  }

  onDashboardUpdated(updatedVal: Dashboard) {
    this.dashboardUpdated.emit(updatedVal);
  }

  onViewChanged(newVal: string) {
    this.viewChange.emit(newVal);
  }

  constructor(public profilService: ProfilService) {}

  ngOnInit() {}

  toggleItemMenu(item: string): void {
    if (this.menuItemActive === item) {
      this.menuItemActive = '';
    } else {
      this.menuItemActive = item;
    }
  }

  // work around bug p-dropdown
  setTagsSelectionDropDownValue(selection: TagsSelection) {
    this.selectionDashboardComp.dropDown.updateSelectedOption(selection);
  }

  // work around bug p-dropdown
  setDashboardDropDownValue(dashboard: Dashboard) {
    this.dashboardSelectionComponent.dropDown.updateSelectedOption(dashboard);
  }

  updateDashboard(dashboard: Dashboard) {
    this.dashboardSaved.emit(dashboard);
  }

  addNewGauge(dashboard: Dashboard) {
    this.gaugeAdded.emit();
  }
}
