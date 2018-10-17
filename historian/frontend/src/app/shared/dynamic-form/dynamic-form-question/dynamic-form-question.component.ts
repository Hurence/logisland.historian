import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() name?: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.name) {
      this.name = this.question.elementId;
    }
  }

  get isValid(): boolean {
    return this.control.disabled || this.control.valid;
  }

  get control(): AbstractControl {
    return this.form.controls[this.question.key];
  }
}
