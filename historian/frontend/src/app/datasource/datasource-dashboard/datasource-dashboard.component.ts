import { Component, OnInit } from '@angular/core';
import { Datasource } from '../Datasource';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit {

  selectedDatasource: Datasource;

  constructor() { }

  ngOnInit() {
  }

  onSelectDatasource(datasource: Datasource) {
    this.selectedDatasource = datasource;
  }
}
