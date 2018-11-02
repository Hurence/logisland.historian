import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { QuestionBase, IQuestionBase, IQuestion } from './question-base';
import { INumberQuestion, NumberQuestion } from './question-number';
import { ConditionalQuestion } from './question-conditional';

@Injectable()
export class QuestionControlService {
  constructor(private fb: FormBuilder) { }

  toFormGroup(questions: QuestionBase<any>[]): FormGroup {
    const group: any = {};
    questions.forEach(question => {
      if (question instanceof ConditionalQuestion) {
        group[question.key] = this.toControl(question);
        group[question.conditionsQuestion.key] = this.toControl(question.conditionsQuestion);
      } else {
        group[question.key] = this.toControl(question);
      }
    });
    return new FormGroup(group);
  }

  toControl(question: QuestionBase<any>): AbstractControl {
    const keyControl: AbstractControl = this.getControl(question.controlType, question.value);
    if (question.disabled) keyControl.disable();
    keyControl.setValidators(this.getValidators(question));
    return keyControl;
  }

  private getValidators(question: QuestionBase<any>): ValidatorFn[] {
    const validators = [];
    if (question.required) validators.push(Validators.required);
    if (QuestionBase.isNumberQuestion(question)) {
      if (question.min || question.min === 0) {
        validators.push(Validators.min(question.min));
      }
      if (question.max || question.max === 0) {
        validators.push(Validators.max(question.max));
      }
    }
    return validators;
  }

  private getControl(questionType: string, questionValue: any): AbstractControl {
    if (questionType === 'array') {
      return this.fb.array([]);
    } else {
      return new FormControl(questionValue || '');
    }
  }
}
