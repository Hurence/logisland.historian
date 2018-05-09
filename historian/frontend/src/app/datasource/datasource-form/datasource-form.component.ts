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

  datasourceTypes : String[];
  @ViewChild(NgForm) dsForm;

  @Input()
  datasource: Datasource;

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes();
    // TODO: Remove this when we're done
    this.datasource = { id: '11', type: 'OPC-DA', name: 'fake 1', domain: 'a', description: 'd', user: 'd', password: 'r', host: 'de' }
  }

  // ngAfterViewInit() {
  //   this.dsForm = this.dsForm
  // }

  onSubmit() { 
    console.log('submited datasource: ' + this.datasource);  
  }

  resetForm() {
    this.dsForm.reset();
  }
}
