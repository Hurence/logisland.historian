import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ArrayQuestion } from '../question-array';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-dynamic-form-question-array',
  templateUrl: './dynamic-form-question-array.component.html',
  styleUrls: ['./dynamic-form-question-array.component.css']
})
export class DynamicFormQuestionArrayComponent implements OnInit {

  @Input() question: ArrayQuestion<any>;
  @Input() form: FormGroup;  
  
  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {}

  addItem(): void {
    this.formArray.push(this.createAnArrayFormGroup());
    this.formArray.markAsDirty();
  }

  removeItem(index: number): void {
    this.formArray.removeAt(index);
    this.formArray.markAsDirty();
  }

  at(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }
  
  get formArray(): FormArray {
    return this.form.get(this.question.key) as FormArray;    
  }

  private createAnArrayFormGroup(): FormGroup {
    return this.qcs.toFormGroup(this.question.questions);
  }
}
