import { EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IModelService } from '../base-model-service';
import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';
import { isObject } from 'util';


export interface CanGetId {
  getId(): string;
}

export abstract class BaseDynamicFormComponent<T, B extends CanGetId> implements OnInit, OnChanges {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() item: T;
  @Output() submitted = new EventEmitter<T>();
  form: FormGroup;

  constructor(protected qcs: QuestionControlService,
              protected service: IModelService<B>) { }

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
    this.subscribeToUpdate(this.service.save(objToSave, objToSave.getId()));
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

  private subscribeToUpdate(submitted: Observable<B>): void {
    submitted.subscribe(
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

  protected abstract create(item: T): B;

  protected abstract convert(backObj: B): T;
}
