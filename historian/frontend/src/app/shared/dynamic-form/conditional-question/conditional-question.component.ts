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

  conditionControlName: string;
  conditionControl: AbstractControl;

  constructor() {}

  ngOnInit() {
    this.conditionControlName = this.question.conditionsQuestion.key;
    this.conditionControl = this.form.get(this.conditionControlName);
  }

}
