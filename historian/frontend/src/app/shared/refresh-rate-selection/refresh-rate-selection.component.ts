import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-refresh-rate-selection',
  templateUrl: './refresh-rate-selection.component.html',
  styleUrls: ['./refresh-rate-selection.component.css']
})
export class RefreshRateSelectionComponent implements OnInit {

  refreshOptions: SelectItem[];
  private _refreshRate: number;
  @Output() refreshRateChange = new EventEmitter<number>();

  constructor() { }

  @Input()
  get refreshRate(): number {
    return this._refreshRate;
  }

  set refreshRate(newVal: number) {
    this._refreshRate = newVal;
    this.refreshRateChange.emit(this._refreshRate);
  }

  ngOnInit() {
    this.refreshOptions = [
      {label: 'None', value: undefined},
      {label: '1 seconds', value: '1000'},
      {label: '5 seconds', value: '5000'},
      {label: '10 seconds', value: '10000'},
      {label: '60 seconds', value: '60000'},
    ];
  }
}
