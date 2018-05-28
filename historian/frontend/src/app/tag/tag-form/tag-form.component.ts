import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../shared/dynamic-form/question.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../shared/dynamic-form/question-control.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  // submitBtnMsg = 'Save';
  @Input() questionsMultiSelection: QuestionBase<any>[] = [];
  @Input() questionsSingleSelection: QuestionBase<any>[] = [];
  @Input() visible: boolean = true;
  @Input() showEntireForm: boolean = true;
  @Input() tag: Tag;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questionsMultiSelection.concat(this.questionsSingleSelection));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tag  && changes.tag.previousValue !== changes.tag.currentValue) this.rebuildForm();
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void {//TODO FACTORIZE SAME IN BOTH
    this.form.reset(this.tag);
    // this.form.reset(this.createFormObject(this.tag));
  }

  onSubmit() {
    const tag = new Tag(this.form.value)
    console.log('tag to be saves :', tag)
    this.payLoad = JSON.stringify(this.form.value);
  }

}
