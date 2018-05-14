import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit, OnChanges {

  datasourceTypes: string[];
  isCreation: boolean;
  credential: string;
  message: string;
  @ViewChild(NgForm) dsForm;
  @Input() datasource: Datasource;
  @Output() submitted = new EventEmitter<Datasource>();

  constructor(private datasourceService: DatasourceService) {}

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes();
    this.datasource = new Datasource();
    this.isCreation = true;
    this.credential = 'none';
  }

  ngOnChanges() {
    this.isCreation = false;
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
            this.message = 'successfully added datasource';
          },
          error => {
            console.error('could not save datasource' + JSON.stringify(error));
            this.message = 'error while saving data source.';
          }
        );
    } else {
      this.datasourceService.updateDatasource(this.datasource)
        .subscribe(
          datasource => {
            console.log('updated successfully to ' + JSON.stringify(datasource));
            this.submitted.emit(datasource);
            this.message = 'successfully updated datasource';
          },
          error => {
            console.error('could not update '  + JSON.stringify(error));
            this.message = 'error while updating data source.';
          }
        );
    }
  }

  resetForm() {
    this.datasource = new Datasource();
    this.isCreation = true;
  }

  resetCred() {
    console.log('reset cred !!!');
    this.datasource.user = null;
    this.datasource.password = null;
  }
}
