import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { RadioQuestion } from '../question-radio';

@Component({
  selector: 'app-dynamic-form-question-radio',
  templateUrl: './dynamic-form-question-radio.component.html',
  styleUrls: ['./dynamic-form-question-radio.component.css']
})
export class DynamicFormQuestionRadioComponent implements OnInit {

  @Input() question: RadioQuestion<any>;
  @Input() form: FormGroup;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {}

  // addItem(): void {
  //   this.formArray.push(this.createAnArrayFormGroup());
  //   this.formArray.markAsDirty();
  // }

  // removeItem(index: number): void {
  //   this.formArray.removeAt(index);
  //   this.formArray.markAsDirty();
  // }

  // at(index: number): FormGroup {
  //   return this.formArray.at(index) as FormGroup;
  // }

  // get formArray(): FormArray {
  //   return this.form.get(this.question.key) as FormArray;
  // }

  // private createAnArrayFormGroup(): FormGroup {
  //   return this.qcs.toFormGroup(this.question.questions);
  // }
}

