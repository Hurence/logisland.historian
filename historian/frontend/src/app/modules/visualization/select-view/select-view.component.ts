import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-view',
  templateUrl: './select-view.component.html',
  styleUrls: ['./select-view.component.css']
})
export class SelectViewComponent implements OnInit {

  private _view: string;
  @Output() viewChange = new EventEmitter<string>();

  @Input()
  get view(): string {
    return this._view;
  }

  set view(newVal: string) {
    this._view = newVal;
    this.viewChange.emit(this._view);
  }
  constructor() { }

  ngOnInit() {
  }

}
