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
}
