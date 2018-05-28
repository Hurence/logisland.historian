import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ): FormGroup {
    let group: any = {};

    questions.forEach(question => {
      const keyControl = new FormControl(question.value || '');
      if (question.required) keyControl.setValidators(Validators.required);
      if (question.disabled) keyControl.disable();
      group[question.key] = keyControl
    });
    return new FormGroup(group);
  }
}