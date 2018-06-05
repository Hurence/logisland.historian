import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { DialogService } from '../../dialog/dialog.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../shared/dynamic-form/question-control.service';
import { Tag, ITag } from '../modele/tag';
import { Observable } from 'rxjs';
import { TagService } from '../service/tag.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';
import { DynamicFormQuestionComponent } from '../../shared/dynamic-form/dynamic-form-question/dynamic-form-question.component';

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
              private fb: FormBuilder,
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

  revert() {//TODO could be factorized
    this.dialogService.confirm('Are you sure you want to discard changes ?')
      .subscribe(ok => {
        if (ok) this.rebuildForm();
      });
  }


  /* save datasource when submitting */
  onSubmit() {
    const tag = this.prepareSaveTag();
    if (this.isCreation) {
      this.subscribeToUpdate(this.tagHistorianService.save(tag),
      'successfully saved tag',
      'error while saving data source.');
    } else {
      this.subscribeToUpdate(this.tagHistorianService.update(tag),
      'successfully updated tag',
      'error while updated data source.');
    }
  }

  private prepareSaveTag(): IHistorianTag {
    const formModel = this.form.value;
    const labelArray: FormArray = this.form.controls.labels as FormArray;
    // deep copy of form model lairs
    const labelsDeepCopy: string[] = labelArray.getRawValue().map(
      (obj: {label: string}) => obj.label
    );
    // return new `Tag` object containing a combination of original tag value(s)
    // and deep copies of changed form model values
    const tag: ITag = Object.assign({} , this.tag);
    Object.assign(tag, formModel);
    Object.assign(tag, {labels: labelsDeepCopy});

    return tag as IHistorianTag;
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void {//TODO FACTORIZE SAME IN BOTH
    const objForForm = this.prepareObjForForm();
    this.form.reset(objForForm);
    const labels = (this.tag as IHistorianTag).labels || [];
    this.setLabels(labels);
  }

  private prepareObjForForm(): any {
    const obj = Object.assign({}, this.tag as any);
    delete obj.labels;
    return obj;
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

  private setLabels(labels: string[]): void {
    if (labels && labels.length !== 0) {
      const labelsFGs = labels.map((label) => this.fb.group({'label': label}));
      const labelFormArray = this.fb.array(labelsFGs);
      this.form.setControl('labels', labelFormArray);
    } else {
      this.form.setControl('labels', this.fb.array([]));
    }
  }

}
