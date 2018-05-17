import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit, OnChanges {

  private dsForm: FormGroup;
  private name: FormControl;
  private typr: FormControl;
  private description: FormControl;
  private host: FormControl;
  private datasourceTypes: string[];
  private isCreation: boolean;
  private hasBeenReset: boolean;
  @Input() datasource: Datasource;
  @Output() submitted = new EventEmitter<Datasource>();
  private submitBtnMsg: string;
  private datasourceIsReachable$: Observable<boolean>;

  constructor(private fb: FormBuilder,
    private datasourceService: DatasourceService) {
    this.isCreation = true;
    this.submitBtnMsg = 'Add Data source';
    this.createForm();
    this.resetCredWhenNone();
    this.hasBeenReset = true;
  }

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes();  
  }

  ngOnChanges() {
    if (this.datasource) this.rebuildForm();
    if (this.hasBeenReset) { 
      this.hasBeenReset = false;
    } else {
      this.isCreation = false;
      this.submitBtnMsg = 'Update Data source';
      this.isReachable();
    }
  }
  //restore form with clean values
  revert() { this.rebuildForm(); }

  private createForm(): void {
    this.dsForm = this.fb.group({
      type: ['OPC-DA', Validators.required ],
      name: ['', Validators.required ],
      description: ['', Validators.required ],
      host: ['', Validators.required ],
      clsid: '',
      progId: '',
      auth: this.fb.group({
        cred: 'none',
        user: '',
        password: '', 
      }),            
    });
  }

  private rebuildForm(): void {
    this.dsForm.reset(this.createFormObject(this.datasource))
  }

  private createFormObject(datasource: Datasource) {
    return {
      type: datasource.datasource_type,
      name: datasource.id,
      description: datasource.description,
      host: datasource.host,
      clsid: datasource.clsid,
      progId: datasource.progId,
      auth: {
        cred: this.findCredentialForDatasource(datasource),
        user: datasource.user,
        password: datasource.password, 
      },            
    };
  }
  
  private findCredentialForDatasource(datasource: Datasource): string {
    if (this.datasource && (this.datasource.password || this.datasource.user)) {
      return 'normal';
    } else {
      return 'none';
    }
  }

  private onSubmit() {
    this.datasource = this.prepareSaveDatasource();
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
    this.rebuildForm();
  }

  private prepareSaveDatasource(): Datasource {
    const formModel = this.dsForm.value;

    const saveDatasource: Datasource = {
      id: formModel.name,
      description: formModel.description,
      host: formModel.host,
      clsid: formModel.clsid,
      progId: formModel.progId,
      user: formModel.user,
      password: formModel.password,
      record_type: 'datasource',
      datasource_type: formModel.type
    };         
    return saveDatasource;
  }

  isReachable(): void {
    if (this.datasource) {
      this.datasourceIsReachable$ = this.datasourceService.datasourceIsReachable(this.datasource.id);
    }
  }

  resetForm(datasource: Datasource) {
    this.hasBeenReset = true;
    this.datasource = datasource;
    this.isCreation = true;
    this.submitBtnMsg = 'Add Data source';
    this.datasourceIsReachable$ = null;
    this.rebuildForm();  
  }

  resetCredWhenNone(): void {
    const credControl = this.dsForm.get('auth.cred');
    credControl.valueChanges.forEach(
      (cred: string) => {
        if (cred === 'none') {
          this.dsForm.patchValue({
            auth: {
              user: null,
              password: null,
            }
          });
        }
      }
    );
  }

  formIsClean(): boolean { return this.dsForm.dirty; }

}
