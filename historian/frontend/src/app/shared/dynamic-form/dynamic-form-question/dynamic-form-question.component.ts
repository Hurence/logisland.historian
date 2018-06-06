import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl }        from '@angular/forms';

import { QuestionBase }     from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { ArrayQuestion } from '../question-array';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder,
    private qcs: QuestionControlService) { }

  ngOnInit(): void { }

  get isValid() {
    return this.form.controls[this.question.key].disabled || this.form.controls[this.question.key].valid;
  }
}
