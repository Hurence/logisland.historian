import { QuestionBase, IQuestionBase } from './question-base';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { QuestionControlService } from './question-control.service';

export interface IRadioQuestion<T> extends IQuestionBase<T> {
  possibleValues?: T[];
}

export class RadioQuestion<T> extends QuestionBase<T> implements IRadioQuestion<T> {
    controlType = 'radio';
    possibleValues: T[];

    constructor(options: IRadioQuestion<T>) {
      super(options);
      this.possibleValues = options.possibleValues || [];
    }
  }
