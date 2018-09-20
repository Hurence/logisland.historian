import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from './auto-refresh-interval';

@Component({
  selector: 'app-refresh-rate-selection',
  templateUrl: './refresh-rate-selection.component.html',
  styleUrls: ['./refresh-rate-selection.component.css']
})
export class RefreshRateSelectionComponent implements OnInit {

  refreshOptions: SelectItem[];
  @Input() autoRefreshInterval: AutoRefreshInterval;
  @Output() autoRefreshIntervalChange = new EventEmitter<AutoRefreshInterval>();

  constructor() { }

  onAutoRefreshIntervalChange(newVal: AutoRefreshInterval) {
    this.autoRefreshInterval = newVal;
    this.autoRefreshIntervalChange.emit(this.autoRefreshInterval);
  }

  ngOnInit() {
    this.refreshOptions = Object.keys(autoRefreshIntervalBuiltIn).map(key => {
      return {
        label: autoRefreshIntervalBuiltIn[key].label,
        value: autoRefreshIntervalBuiltIn[key],
      };
    });
  }
}
