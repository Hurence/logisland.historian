import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dataset } from '../../dataset/dataset';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-datasources-list',
  templateUrl: './datasources-list.component.html',
  styleUrls: ['./datasources-list.component.css']
})
export class DatasourcesListComponent implements OnInit {

  datasources$: Observable<Datasource[]>;
  @Input() dataSet: Dataset;
  @Output() selectDatasource = new EventEmitter<Datasource>();

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.getDatasources();
  }

  getDatasources(): void {
    this.datasources$ = this.datasourceService.getDatasources();
  }

  getDatasourcesQuery(queryParameter: string) {
    this.datasources$ = this.datasourceService.getDatasourcesQuery(queryParameter)
      .pipe(catchError(error => []));
  }


  onDeleteDatasource(datasource: Datasource) {
    this.datasourceService.deleteDatasource(datasource)
      .subscribe(deletedDs => {
        console.log('deleted datasource with id :' + deletedDs.id);
        this.getDatasources();
      });
    // TODO handle error and just remove from array directly ?
  }

  onSelect(datasource: Datasource) {
    this.selectDatasource.emit(datasource);
  }

  onAddToDataset(datasource: Datasource) {
    this.dataSet.addDatasource(datasource);
  }

  onRemoveFromDataset(datasource: Datasource) {
    this.dataSet.removeDatasource(datasource);
  }

  dataSetContain(datasource: Datasource): boolean {
    if (this.dataSet) {
      return this.dataSet.containDatasource(datasource);
    }
    return false;
  }
}