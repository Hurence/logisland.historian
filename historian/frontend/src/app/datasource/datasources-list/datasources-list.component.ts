import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  dataSet: Datasource[];
  @Output() onSelectDatasource = new EventEmitter<Datasource>();

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.getDatasources();
    this.dataSet = [];
  }

  getDatasources(): void {
    this.datasourceService.getDatasources()
      .subscribe(datasources => this.datasources = datasources);
  }

  onDeleteDatasource(datasource: Datasource) {
    this.datasourceService.deleteDatasource(datasource)
      .subscribe(deletedDs => {
        console.log('deleted datasource with id :' + deletedDs.id);
        this.getDatasources();
      });
    //TODO handle error and just remove from array directly ?
  }

  onSelect(datasource: Datasource) {
    this.onSelectDatasource.emit(datasource);
    this.selectedDatasource = datasource;
  }

  onAddToDataset(datasource: Datasource) {
    this.dataSet.push(datasource);
  }

  onRemoveFromDataset(datasource: Datasource) {
    let index = this.dataSet.indexOf(datasource);
    console.log('index of element to remove is ' + index);
    if (index === -1) return;
    this.dataSet.splice(index, 1);
  }

  dataSetContain(datasource: Datasource): boolean {
      return this.dataSet.includes(datasource);
  }

  
}
