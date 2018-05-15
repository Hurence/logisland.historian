import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datasource-search',
  templateUrl: './datasource-search.component.html',
  styleUrls: ['./datasource-search.component.css']
})
export class DatasourceSearchComponent implements OnInit {


  @Output() queryString = new EventEmitter<string>();
  private filterString: string;

  constructor() { }

  ngOnInit() {

  }
  
  update(value: string) { 
    this.queryString.emit(value);
    this.filterString = value;
  }
}
