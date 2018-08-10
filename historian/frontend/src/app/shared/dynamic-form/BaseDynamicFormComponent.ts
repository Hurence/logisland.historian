import { EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IModelService } from '../base-model-service';
import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';
import { isObject } from 'util';
import { ConfirmationService } from 'primeng/api';


export interface CanGetId {
  getId(): string;
}

export abstract class BaseDynamicFormComponent<T, B extends CanGetId> implements OnInit, OnChanges {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() item: T;
  @Output() submitted = new EventEmitter<T>();
  form: FormGroup;

  private DISCARD_CHANGE_MSG = 'Are you sure you want to reset form ?';

  constructor(protected qcs: QuestionControlService,
              protected service: IModelService<B>,
              protected confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.rebuildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && !changes.item.isFirstChange() && changes.item.currentValue !== changes.item.previousValue) {
      this.rebuildForm();
    }
  }

  onSubmit() {
    const objToSave = this.prepareSaveItem();
    this.service.save(objToSave, objToSave.getId()).subscribe(
      obj => {
        const converted = this.convert(obj);
        this.item = converted;
        this.submitted.emit(converted);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  reset() {
    this.confirmationService.confirm({
      message: this.DISCARD_CHANGE_MSG,
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

  /* Fill in form with current datasource properties */
  protected rebuildForm(): void { // TODO FACTORIZE SAME IN BOTH
    const objForForm = Object.assign({}, this.item);
    this.form.reset(objForForm);
  }

  /* Return a datasource based on formulaire inputs */
  protected prepareSaveItem(): B {
    const formModel = this.form.value;
    const item = this.create(this.item);
    Object.assign(item, formModel);
    return item;
  }

  protected abstract create(item: T): B;

  protected abstract convert(backObj: B): T;
}
