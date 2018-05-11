import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasources-list',
  templateUrl: './datasources-list.component.html',
  styleUrls: ['./datasources-list.component.css']
})
export class DatasourcesListComponent implements OnInit {

  datasources: Datasource[];
  selectedDatasource: Datasource;
  @Output() onSelectDatasource = new EventEmitter<Datasource>();

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.getDatasources();
  }

  getDatasources(): void {
    this.datasourceService.getDatasources()
      .subscribe(datasources => this.datasources = datasources);
  }

  onSelect(datasource: Datasource) {
    this.onSelectDatasource.emit(datasource);
    this.selectedDatasource = datasource;
  }

}
