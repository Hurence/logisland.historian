import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Datasource, TagBrowsingMode } from '../Datasource';
import { DatasourceService } from '../datasource.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit, OnChanges {

  dsForm: FormGroup;
  private name: AbstractControl;
  private user: AbstractControl;
  private password: AbstractControl;
  datasourceTypes: string[];

  private red = 'color-red';
  private green = 'color-green';
  statusClass: string = this.red;

  @Input() isCreation: boolean;
  @Input() datasource: Datasource;
  @Input() prefixId: string;
  @Output() submitted = new EventEmitter<Datasource>();

  submitBtnMsg: string;

  private BTN_MSG_ADD = 'Add Data source';
  private BTN_MSG_UPDATE = 'Update Data source';

  private CREADENTIAL_NONE = 'none';
  private CREADENTIAL_NORMAL = 'normal';

  private DISCARD_CHANGE_QUESTION_MSG = 'Are you sure you want to discard changes ?';

  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService) {

    this.createForm();
    this.resetCredWhenNone();
  }

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes(); // TODO should disappear when using dynamic form
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource  && changes.datasource.previousValue !== changes.datasource.currentValue) {
      this.rebuildForm(); // TODO could be factorized
    }
    if (changes.isCreation && changes.isCreation.previousValue !== changes.isCreation.currentValue) {
      if (this.isCreation) {
        this.enableName();
        this.submitBtnMsg = this.BTN_MSG_ADD;
        this.statusClass = this.red;
      } else {
        this.disableName();
        this.submitBtnMsg = this.BTN_MSG_UPDATE;
        this.isReachable();
      }
    } else {
      if (!this.isCreation) this.isReachable();
    }
  }

  // restore form with clean values
  revert() { // TODO could be factorized
    this.confirmationService.confirm({
      message: this.DISCARD_CHANGE_QUESTION_MSG,
      header: 'Confirmation',
      rejectLabel: 'Cancel',
      acceptLabel: 'Ok',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rebuildForm();
      },
      reject: () => { }
    });
  }

  formIsClean(): boolean { return this.dsForm.dirty; } // TODO could be factorized

  /* Buil form for the first time */
  private createForm(): void { // TODO should disappear when using dynamic form
    this.dsForm = this.fb.group({
      type: ['OPC-DA', Validators.required],
      name: [{ value: '', disabled: false }, Validators.required],
      description: ['', Validators.required],
      host: ['', Validators.required],
      domain: ['', Validators.required],
      clsid: '',
      progId: '',
      auth: this.fb.group({
        cred: this.CREADENTIAL_NONE,
        user: [{ value: '', disabled: true }, Validators.required],
        password: [{ value: '', disabled: true }, Validators.required],
      }),
      tagBrowsing: [TagBrowsingMode.MANUAL, Validators.required],
    });
    this.name = this.dsForm.get('name');
    this.user = this.dsForm.get('auth.user');
    this.password = this.dsForm.get('auth.password');
  }

  private disableName(): void {
    this.name.disable();
  }

  private enableName(): void {
    this.name.enable();
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void {
    /*TODO could be factorized but form structure is different from model object...
    Have to find an intelligent way to deal with that*/
    this.dsForm.reset(this.createFormObject(this.datasource));
  }

  /* Create form object from given datasource */
  private createFormObject(datasource: Datasource) {
    return {
      type: datasource.datasource_type,
      name: datasource.id,
      description: datasource.description,
      host: datasource.host,
      domain: datasource.domain,
      clsid: datasource.clsid,
      progId: datasource.prog_id,
      auth: {
        cred: this.findCredentialForDatasource(datasource),
        user: datasource.user,
        password: datasource.password,
      },
      tagBrowsing: datasource.tag_browsing
    };
  }

  /*  return type of credential for given datasource */
  private findCredentialForDatasource(datasource: Datasource): string {
    if (this.datasource && (this.datasource.password || this.datasource.user)) {
      return this.CREADENTIAL_NORMAL;
    } else {
      return this.CREADENTIAL_NONE;
    }
  }

  /* save datasource when submitting */
  onSubmit() {
    this.datasource = this.prepareSaveDatasource();
    if (this.isCreation) {
      this.subscribeToUpdate(this.datasourceService.createOrReplace(this.datasource, this.datasource.id));
    } else {
      this.subscribeToUpdate(this.datasourceService.createOrReplace(this.datasource, this.datasource.id));
    }
  }
  /* subscribe to update or save request
     emitting saved datasource, testing if it is reachable then alerting user when it is done.
  */
  private subscribeToUpdate(submitted: Observable<Datasource>): void {
    submitted.subscribe(
      datasource => {
        this.submitted.emit(datasource);
        this.isReachable();
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  /* Return a datasource based on formulaire inputs */
  private prepareSaveDatasource(): Datasource {
    const formModel = this.dsForm.value;

    const saveDatasource: Datasource = new Datasource({
      id: formModel.name || this.datasource.id, // when disabled
      description: formModel.description,
      host: formModel.host,
      domain: formModel.domain,
      clsid: formModel.clsid,
      prog_id: formModel.progId,
      user: formModel.auth.user,
      password: formModel.auth.password,
      datasource_type: formModel.type,
      tag_browsing: formModel.tagBrowsing,
    });
    return saveDatasource;
  }

  /* update the test (datasourceIsReachable) if server can connect to the datasource */
  private isReachable(): void {
    if (this.datasource) {
      this.datasourceService.datasourceIsReachable(this.datasource.id)
      .subscribe(reachable => {
        const newClass = reachable ? this.green : this.red;
        this.statusClass = newClass;
      });
    }
  }

  /* Listen to auth.cred controller so it resets credentials when selecting none */
  private resetCredWhenNone(): void {
    this.dsForm.get('auth.cred').valueChanges.forEach(
      (cred: string) => {
        if (cred === this.CREADENTIAL_NONE) {
          this.dsForm.patchValue({
            auth: {
              user: null,
              password: null,
            }
          });
          this.user.disable();
          this.password.disable();
        } else {
          this.user.enable();
          this.password.enable();
        }
      }
    );
  }
}
