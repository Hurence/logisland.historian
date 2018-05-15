import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit, OnChanges {

  datasourceTypes: string[];
  isCreation: boolean;
  credential: string;
  @ViewChild(NgForm) dsForm;
  @Input() datasource: Datasource;
  @Output() submitted = new EventEmitter<Datasource>();
  private submitBtnMsg: string;
  private datasourceIsReachable$: Observable<boolean>;

  constructor(private datasourceService: DatasourceService) {}

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes();
    this.datasource = new Datasource('', '');
    this.isCreation = true;
    this.credential = 'none';
    this.submitBtnMsg = 'Add Data source';
  }

  ngOnChanges() {
    this.isCreation = false;
    this.submitBtnMsg = 'Update Data source';
    if (this.datasource && (this.datasource.password || this.datasource.user)) {
      this.credential = 'normal';
    } else {
      this.credential = 'none';
    }
  }

  onSubmit() {
    if (this.isCreation) {
      this.datasourceService.saveDatasource(this.datasource)
        .subscribe(
          datasource => {
            console.log('saved successfully to ' + JSON.stringify(datasource));
            this.submitted.emit(datasource);
            this.isReachable();
            alert('successfully added datasource');
          },
          error => {
            console.error('could not save datasource' + JSON.stringify(error));
            alert('error while saving data source.');
          }
        );
    } else {
      this.datasourceService.updateDatasource(this.datasource)
        .subscribe(
          datasource => {
            console.log('updated successfully to ' + JSON.stringify(datasource));
            this.submitted.emit(datasource);
            this.isReachable();
            alert('successfully updated datasource');
          },
          error => {
            console.error('could not update '  + JSON.stringify(error));
            alert('error while updating data source.');  
          }
        );
    }
  }

  isReachable(): void {
    this.datasourceIsReachable$ = this.datasourceService.datasourceIsReachable(this.datasource.id);
  }

  resetForm() {
    this.datasource = new Datasource('', '');
    this.isCreation = true;
    this.submitBtnMsg = 'Add Data source';
    this.datasourceIsReachable$ = null;
  }

  resetCred() {
    console.log('reset cred !!!');
    this.datasource.user = null;
    this.datasource.password = null;
  }
}
