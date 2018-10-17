import { Component, OnInit, Input } from '@angular/core';
import { ConditionalQuestion } from '../question-conditional';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-conditional-question',
  templateUrl: './conditional-question.component.html',
  styleUrls: ['./conditional-question.component.css']
})
export class ConditionalQuestionComponent implements OnInit {

  @Input() question: ConditionalQuestion<any>;
  @Input() form: FormGroup;
  @Input() nameForConditional: string;

  internalForm: FormGroup;

  constructor(private qcs: QuestionControlService) {

  }

  ngOnInit() {
    this.internalForm = this.qcs.toFormGroup([this.question.conditionsQuestion]);
    this.internalForm.get(this.question.conditionsQuestion.key).valueChanges.forEach(
      (condition: string) => {
        this.form.get(this.question.key).reset();
    });
  }

  findResultQuestion(group: FormGroup): QuestionBase<any> {
    const condition = group.get(this.question.conditionsQuestion.key).value;
    return this.question.conditionsResult.find(kv => kv.ifKey === condition).thenQuestion;
  }

}
