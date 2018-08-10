import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { QuestionService } from '../../../../shared/dynamic-form/question.service';
import { IHistorianTag } from '../../modele/HistorianTag';
import { TagUtils } from '../../modele/TagUtils';
import { TagHistorianService } from '../../service/tag-historian.service';
import { ITagFormInput } from '../TagFormInput';
import { ITagFormOutput, TagFormOutput } from '../TagFormOutput';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  questions: QuestionBase<any>[] = [];
  @Input() tags: ITagFormInput[];

  @Output() submitted = new EventEmitter<IHistorianTag>();
  submitBtnMsg: string;
  private BTN_MSG_ADD = 'Save';
  private BTN_MSG_UPDATE = 'Update';
  private DISCARD_CHANGE_MSG = 'Are you sure you want to discard changes ?';
  private FAILED_SAVED_MSG = 'error while saving tag.';

  constructor(private qcs: QuestionControlService,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private qs: QuestionService,
              private tagHistorianService: TagHistorianService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.questions = this.qs.getTagForm();
    this.form = this.qcs.toFormGroup(this.questions);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tags && changes.tags.currentValue && changes.tags.currentValue.length !== 0) {
      if (changes.tags.previousValue !== changes.tags.currentValue) {
        this.rebuildForm();
        this.updateBtn();
      }
    }
  }

  private updateBtn(): void {
    let creation = false;
    let update = false;
    this.tags.forEach(i => {
      if (i.isCreation) {
        creation = true;
      } else {
        update = true;
      }
    });
    if (creation) {
      if (update) {
        this.submitBtnMsg = `${this.BTN_MSG_ADD} & ${this.BTN_MSG_UPDATE}`;
      } else {
        this.submitBtnMsg = this.BTN_MSG_ADD;
      }
    } else if (update) {
      this.submitBtnMsg = this.BTN_MSG_UPDATE;
    }
  }



  reset() { // TODO could be factorized
    this.confirmationService.confirm({
      message: this.DISCARD_CHANGE_MSG,
      header: 'Confirmation',
      rejectLabel: 'Cancel',
      acceptLabel: 'Ok',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rebuildForm();
      },
      reject: () => { }
    });
  }


  /* save datasource when submitting */
  onSubmit() {
    const tagsToSave = this.prepareSaveTag().map(o => o.tag);
    this.tagHistorianService.saveMany(tagsToSave).subscribe(
      tags => {
        tags.forEach(tag => this.submitted.emit(tag));
      },
      error => {
        console.error(JSON.stringify(error));
        this.messageService.add({
          severity: 'error',
          summary: error.status,
          detail: this.FAILED_SAVED_MSG,
        });
      }
    );
  }

  private prepareSaveTag(): ITagFormOutput[] {
    return this.tags.map(i => new TagFormOutput(i, this.form));
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void { // TODO FACTORIZE SAME IN BOTH
    const objForForm = this.prepareObjForForm();
    this.form.reset(objForForm);
    const concatenedLabels: Set<string> = this.tags.reduce((p, c) => {
      if (TagUtils.isHistorianTag(c.tag) && c.tag.labels) {
        c.tag.labels.forEach(label => p.add(label));
      }
      return p;
    },
      new Set<string>()
    );
    this.setLabels(concatenedLabels);
  }

  private prepareObjForForm(): any {
    const obj = Object.assign({}, this.tags[this.tags.length - 1].tag as any);
    delete obj.labels;
    return obj;
  }

  private setLabels(labels: Set<string>): void {
    if (labels && labels.size !== 0) {
      const labelsFGs: FormGroup[] = [];
      labels.forEach(label => {
        labelsFGs.push(this.fb.group({'label': label}));
      });
      const labelFormArray = this.fb.array(labelsFGs);
      this.form.setControl('labels', labelFormArray);
    } else {
      this.form.setControl('labels', this.fb.array([]));
    }
  }

}
