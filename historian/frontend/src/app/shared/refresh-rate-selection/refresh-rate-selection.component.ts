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
  private _autoRefreshInterval: AutoRefreshInterval;
  @Output() autoRefreshIntervalChange = new EventEmitter<AutoRefreshInterval>();

  constructor() { }

  @Input()
  get autoRefreshInterval(): AutoRefreshInterval {
    return this._autoRefreshInterval;
  }

  set autoRefreshInterval(newVal: AutoRefreshInterval) {
    this._autoRefreshInterval = newVal;
    this.autoRefreshIntervalChange.emit(this._autoRefreshInterval);
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
