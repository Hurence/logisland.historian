import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Dataset } from '../../dataset/dataset';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasources-list',
  templateUrl: './datasources-list.component.html',
  styleUrls: ['./datasources-list.component.css']
})
export class DatasourcesListComponent implements OnInit {

  datasources$: Observable<Datasource[]>;
  @Input() dataSet: Dataset;
  private selectedDatasource : Datasource;
  @Output() selectedDatasourceE = new EventEmitter<Datasource>();

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.getDatasources();
  }

  unSelectDatasource(): void {
    this.selectedDatasource = null;
  }
  /*
    select given datasource.
    Should be used only by external components.
  */
  forceSelectDatasource(datasource: Datasource): void {
    this.selectedDatasource = datasource;
  }

  getDatasources(): void {
    this.datasources$ = this.datasourceService.getDatasources();
  }

  getDatasourcesQuery(queryParameter: string) {
    this.datasources$ = this.datasourceService.getDatasourcesQuery(queryParameter)
      .pipe(catchError(error => of([])));
  }


  private onDeleteDatasource(datasource: Datasource) {
    this.datasourceService.deleteDatasource(datasource)
      .subscribe(deletedDs => {      
        console.log('deleted datasource with id :' + deletedDs.id);        
        this.dataSet.removeDatasource(deletedDs);
        this.getDatasources();
      });
    // TODO handle error and just remove from array directly ?
  }

  private onSelect(datasource: Datasource) {
    if (datasource === this.selectedDatasource) {           
      this.selectDatasource(null);
    } else {
      this.selectDatasource(datasource);
    }
  }

  private onAddToDataset(datasource: Datasource) {
    this.dataSet.addDatasource(datasource);
  }

  private onRemoveFromDataset(datasource: Datasource) {
    this.dataSet.removeDatasource(datasource);
  }

  private dataSetContain(datasource: Datasource): boolean {
    if (this.dataSet) {
      return this.dataSet.containDatasource(datasource);
    }
    return false;
  }

  private selectDatasource(datasource: Datasource): void {
    this.selectedDatasourceE.emit(datasource);
    this.selectedDatasource = datasource;
  }
}
