import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit {

  datasourceTypes : string[];
  isCreation: boolean;
  credential: string;
  @ViewChild(NgForm) dsForm;
  @Input() datasource: Datasource;

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
      this.credential = 'normal'
    } else {
      this.credential = 'none'
    }
  }

 
  onSubmit() { 
    if (this.isCreation) {
      this.datasourceService.saveDatasource(this.datasource)
        .subscribe(datasource => console.log('saved successfully to ' + JSON.stringify(datasource)));
    } else {
      this.datasourceService.updateDatasource(this.datasource)
        .subscribe(datasource => console.log('updated successfully to ' + JSON.stringify(datasource)));
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
