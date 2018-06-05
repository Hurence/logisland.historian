import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, AbstractControl, FormBuilder } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor(private fb: FormBuilder) { }

  toFormGroup(questions: QuestionBase<any>[]): FormGroup {
    let group: any = {};

    questions.forEach(question => {
      const keyControl: AbstractControl = this.getControl(question.controlType, question.value);
      if (question.required) keyControl.setValidators(Validators.required);
      if (question.disabled) keyControl.disable();
      group[question.key] = keyControl
    });
    return new FormGroup(group);
  }

  private getControl(questionType: string, questionValue: any): AbstractControl {
    if (questionType === 'array') {
      return this.fb.array([]);
    } else {
      return new FormControl(questionValue || '');
    }
  }
}