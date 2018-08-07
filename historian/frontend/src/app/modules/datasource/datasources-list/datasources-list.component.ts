import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-datasources-list',
  templateUrl: './datasources-list.component.html',
  styleUrls: ['./datasources-list.component.css']
})
export class DatasourcesListComponent implements OnInit {

  datasources$: Observable<Datasource[]>;
  @Input() selectedDatasource: Datasource;
  @Output() selectedDatasourceE = new EventEmitter<Datasource>();
  datasourceToEdit: Datasource;
  displayEditDatasource = false;

  private CANCEL_MSG = 'Cancel';
  private REMOVE_DATASOURCE_MSG = 'Remove data source';

  constructor(private datasourceService: DatasourceService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getDatasources();
  }

  getDatasources(): void {
    this.datasources$ = this.datasourceService.getAll();
  }

  getDatasourcesQuery(queryParameter: string) {
    this.datasources$ = this.datasourceService.getDatasourcesQuery(queryParameter)
      .pipe(catchError(error => of([])));
  }

  onDeleteDatasource(datasource: Datasource): void {
    const msg = `Delete data source ${datasource.description} ${datasource.datasource_type} ?`;
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: this.CANCEL_MSG,
      acceptLabel: this.REMOVE_DATASOURCE_MSG,
      accept: () => {
        this.datasourceService.delete(datasource.id)
        .subscribe(deletedDs => {
          this.getDatasources();
          if (this.selectedDatasource.id === deletedDs.id) {
            this.onSelect(null);
          }
        });
      },
      reject: () => {
        console.error('An error occured while deleting datasource.');
      }
    });
  }

  onSelect(datasource: Datasource) {
    this.selectedDatasourceE.emit(datasource);
  }

  onEditDatasource(datasource: Datasource) {
    this.datasourceToEdit = datasource;
    this.displayEditDatasource = true;
  }

  onSubmitted(ds: Datasource) {
    this.getDatasources();
    this.selectedDatasource = ds;
    this.displayEditDatasource = false;
  }

  isActive(ds: Datasource): boolean {
    return (this.selectedDatasource !== null
       && this.selectedDatasource !== undefined
       && this.selectedDatasource.id === ds.id);
  }
}
