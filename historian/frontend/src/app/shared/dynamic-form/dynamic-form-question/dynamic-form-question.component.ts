import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl }        from '@angular/forms';

import { QuestionBase }     from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { ArrayQuestion } from '../question-array';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;  

  constructor(private fb: FormBuilder,
    private qcs: QuestionControlService) { }

  get isValid() { return this.form.controls[this.question.key].disabled || this.form.controls[this.question.key].valid; }

  addItem() {    
    this.arrayControls.push(this.createAnArrayFormGroup()); 
  }

  private createAnArrayFormGroup(): FormGroup {
    return this.qcs.toFormGroup((this.question as ArrayQuestion<string>).questions);          
  }

  removeItem(index: number) {        
    if (index > -1) {
      this.arrayControls.splice(index, 1);
    }    
  }

  updateArray(labels: string[]) {
    if (labels) {
      const labelsFGs = labels.map(label => this.fb.group({'label': label}));      
      console.log('labels are ', labelsFGs)
      const labelFormArray = this.fb.array(labelsFGs);
      this.form.setControl('labels', labelFormArray);
      debugger
    } else {
      this.form.setControl('labels', this.fb.array([]));
      debugger
    }    
  }

  get formArray(): FormArray {
    return this.form.get(this.question.key) as FormArray;
  }

  get arrayControls(): AbstractControl[] {
    return this.formArray.controls;
  }
  
}