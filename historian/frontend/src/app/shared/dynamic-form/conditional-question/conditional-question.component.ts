import { Component, OnInit, Input } from '@angular/core';
import { ConditionalQuestion } from '../question-conditional';
import { FormGroup, AbstractControl } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { HistorianTag } from '../../../modules/tag/modele/HistorianTag';
import { debug } from 'util';

@Component({
  selector: 'app-conditional-question',
  templateUrl: './conditional-question.component.html',
  styleUrls: ['./conditional-question.component.css']
})
export class ConditionalQuestionComponent implements OnInit {

  @Input() question: ConditionalQuestion<any>;
  @Input() form: FormGroup;
  @Input() nameForConditional: string;

  // internalForm: FormGroup;
  conditionControlName: string;
  conditionControl: AbstractControl;

  constructor(private qcs: QuestionControlService) {

  }

  ngOnInit() {
    this.conditionControlName = this.question.conditionsQuestion.key;
    this.conditionControl = this.qcs.toControl(this.question.conditionsQuestion);
    console.log(`adding control with key '${this.conditionControlName}'`)
    this.form.addControl(this.conditionControlName, this.conditionControl);    
    this.conditionControl.valueChanges.forEach(
      (condition: string) => {
        console.log(`radio changed to '${condition}'`)
        // this.form.get(this.question.key).reset();
        // const resultQuestion = this.question.conditionsResult.find(kv => kv.ifKey === condition);        
    });

    // this.question.conditionsResult.forEach(kv => {
    //   const ifKey = kv.ifKey;
    //   const thenQuestion = kv.thenQuestion;
    //   this.form.get(this.question.key).valueChanges.forEach(v => {
    //     if (v instanceof HistorianTag) {
    //       this.internalForm.get(this.question.conditionsQuestion.key).setValue('dynamic');
    //     } else {
    //       this.internalForm.get(this.question.conditionsQuestion.key).setValue('static');
    //     }
    //   })
    // })
    // this.question.type
    // this.form.get(this.question.key).valueChanges.forEach(
    //   (v: any) => {
    //     console.log(`${this.question.key} changed to ${v}`); 
    //     this.internalForm.get(this.question.conditionsQuestion.key).setValue("dynamic")              
    //   }
    // );

    // this.form.get(this.question.key).valueChanges.forEach(
    //   (typ: string) => {
    //     if (typ === DatasourceType.OPC_DA) { // TODO we need type
    //       this.internalForm.get(this.question.conditionsQuestion.key).setValue("ifKey")          
    //     } else if (typ === DatasourceType.OPC_UA) { // TODO we need type
    //       this.internalForm.get(this.question.conditionsQuestion.key).setValue("ifKey")
    //     }
    //   }
    // );
  
  }

  findResultQuestion(): QuestionBase<any> {
    const condition = this.conditionControl.value;
    return this.question.conditionsResult.find(kv => kv.ifKey === condition).thenQuestion;
  }

}
