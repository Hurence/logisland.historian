import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';
import { IModification, Operation } from '../../modules/datasource/ConfigurationToApply';


export interface CanGetId {
  getId(): string;
}

export abstract class BaseDynamicFormComponentEmitter<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() item?: T;
  @Output() submitted = new EventEmitter<IModification<T>>();
  form: FormGroup;

  protected abstract formOperation: Operation;
  private DISCARD_CHANGE_MSG = 'Are you sure you want to reset form ?';

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  ngAfterViewInit() {
    // workaround to not have ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.rebuildForm(), 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && !changes.item.isFirstChange() && changes.item.currentValue !== changes.item.previousValue) {
      this.rebuildForm();
    }
  }

  onSubmit() {
    this.submitted.emit({
      operation: this.formOperation,
      item: this.prepareSaveItem()
    });
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

  protected rebuildForm(): void {
    const objForForm = Object.assign({}, this.item);
    this.form.reset(objForForm);
  }

  protected prepareSaveItem(): T {
    const item: T = this.create();
    Object.assign(item, this.item);
    Object.assign(item, this.form.value);
    return item;
  }

  protected abstract create(): T;
}
