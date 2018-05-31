import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DialogService } from '../../dialog/dialog.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../shared/dynamic-form/question-control.service';
import { Tag, ITag } from '../modele/tag';
import { Observable } from 'rxjs';
import { TagService } from '../service/tag.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';

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
  @Input() isCreation: boolean;
  @Input() tag: ITag;
  @Output() submitted = new EventEmitter<IHistorianTag>();
  payLoad = '';
  submitBtnMsg: string;
  private BTN_MSG_ADD = 'Save';
  private BTN_MSG_UPDATE = 'Update';

  constructor(private qcs: QuestionControlService,
              private dialogService: DialogService,
              private tagHistorianService: TagHistorianService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questionsMultiSelection.concat(this.questionsSingleSelection));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tag  && changes.tag.previousValue !== changes.tag.currentValue) this.rebuildForm();
    if (changes.isCreation && changes.isCreation.previousValue !== changes.isCreation.currentValue) {
      if (this.isCreation) {
        this.submitBtnMsg = this.BTN_MSG_ADD;
      } else {
        this.submitBtnMsg = this.BTN_MSG_UPDATE;
      }
    }
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void {//TODO FACTORIZE SAME IN BOTH
    this.form.reset(this.tag);
  }

  /* save datasource when submitting */
  onSubmit() {
    const tag = Object.assign({} ,this.tag);
    Object.assign(tag, this.form.value);
    console.log('tag to be saved :', tag)
    this.payLoad = JSON.stringify(tag);//TODO remove when test over
    if (this.isCreation) {
      this.subscribeToUpdate(this.tagHistorianService.save(tag as IHistorianTag),
      'successfully saved tag',
      'error while saving data source.');
    } else {
      this.subscribeToUpdate(this.tagHistorianService.update(tag as IHistorianTag),
      'successfully updated tag',
      'error while updated data source.');
    }
  }

  private subscribeToUpdate(submitted: Observable<IHistorianTag>,
                            msgSuccess: string,
                            msgError: string): void {
    submitted.subscribe(
      tag => {
        this.submitted.emit(tag);
        this.dialogService.alert(msgSuccess);
      },
      error => {
        console.error(JSON.stringify(error));
        this.dialogService.alert(msgError);
      }
    );
  }


  revert() {//TODO could be factorized
    this.dialogService.confirm('Are you sure you want to discard changes ?')
      .subscribe(ok => {
        if (ok) this.rebuildForm();
      });
  }
}
