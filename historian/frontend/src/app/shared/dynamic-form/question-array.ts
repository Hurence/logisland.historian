import { QuestionBase, IQuestionBase } from './question-base';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { QuestionControlService } from './question-control.service';

export interface IArrayQuestion<T> extends IQuestionBase<T[]> {
  questions: QuestionBase<any>[];
}

export class ArrayQuestion<T> extends QuestionBase<T[]> implements IArrayQuestion<T> {
    controlType = 'array';
    questions: QuestionBase<any>[];

    constructor(options: IArrayQuestion<T>) {
      super(options);
      this.questions = options.questions || [];
    }
  }
