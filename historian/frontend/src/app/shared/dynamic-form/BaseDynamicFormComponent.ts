import { EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IModelService } from '../base-model-service';
import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';


export interface CanGetId {
  getId(): string;
}

export abstract class BaseDynamicFormComponent<T extends CanGetId> implements OnInit, OnChanges {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() item: T;
  @Output() submitted = new EventEmitter<T>();
  form: FormGroup;
  protected SUCCESSFULLY_SAVED_MSG = 'successfully added tag';
  protected FAILED_SAVED_MSG = 'error while saving tag.';


  constructor(protected qcs: QuestionControlService,
              protected service: IModelService<T>) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.rebuildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && !changes.item.isFirstChange && changes.item.currentValue !== changes.item.previousValue) {
      this.rebuildForm();
    }
  }

  onSubmit() {
    this.item = this.prepareSaveItem();
    this.subscribeToUpdate(this.service.save(this.item, this.item.getId()),
      this.SUCCESSFULLY_SAVED_MSG,
      this.FAILED_SAVED_MSG);
  }

  /* Fill in form with current datasource properties */
  protected rebuildForm(): void { // TODO FACTORIZE SAME IN BOTH
    const objForForm = Object.assign({}, this.item);
    this.form.reset(objForForm);
  }

  /* Return a datasource based on formulaire inputs */
  protected prepareSaveItem(): T {
    const formModel = this.form.value;
    const item = Object.assign(this.create(), this.item);
    Object.assign(item, formModel);
    return item;
  }

  private subscribeToUpdate(submitted: Observable<T>,
                            msgSuccess: string,
                            msgError: string): void {
    submitted.subscribe(
      obj => {
        this.submitted.emit(obj);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  protected abstract create(): T;
}
