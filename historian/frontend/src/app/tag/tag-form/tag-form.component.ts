import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { DialogService } from '../../dialog/dialog.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../shared/dynamic-form/question-control.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { ITag, Tag } from '../modele/tag';
import { TagHistorianService } from '../service/tag-historian.service';
import { ITagFormInput } from './TagFormInput'
import { ITagFormOutput, TagFormOutput } from './TagFormOutput'

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() questionsMultiSelection: QuestionBase<any>[] = [];
  @Input() questionsSingleSelection: QuestionBase<any>[] = [];
  @Input() visible = true;
  @Input() showEntireForm = true;
  @Input() tags: ITagFormInput[];

  @Output() submitted = new EventEmitter<IHistorianTag>();
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
    if (changes.tags  &&
      changes.tags.currentValue.length !== 0 &&
      changes.tags.previousValue !== changes.tags.currentValue) {
        this.rebuildForm();
        this.updateBtn();
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
    })
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



  revert() { // TODO could be factorized
    this.dialogService.confirm('Are you sure you want to discard changes ?')
      .subscribe(ok => {
        if (ok) this.rebuildForm();
      });
  }


  /* save datasource when submitting */
  onSubmit() {
    this.prepareSaveTag().map(o => {
      if (o.isCreation) {
        this.subscribeToUpdate(this.tagHistorianService.save(o.tag),
        'successfully saved tag',
        'error while saving data source');
      } else {
        this.subscribeToUpdate(this.tagHistorianService.update(o.tag),
        'successfully updated tag',
        'error while updated data source');
      }
    });
  }

  private prepareSaveTag(): ITagFormOutput[] {
    return this.tags.map(i => new TagFormOutput(i, this.form));
  }

  /* Fill in form with current datasource properties */
  private rebuildForm(): void { // TODO FACTORIZE SAME IN BOTH
    const objForForm = this.prepareObjForForm();
    this.form.reset(objForForm);
    const concatenedLabels: Set<string> = this.tags.reduce((p, c) => {
      if (Tag.isHistorianTag(c.tag) && c.tag.labels) {
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

  private subscribeToUpdate(submitted: Observable<IHistorianTag>,
                            msgSuccess: string,
                            msgError: string): void {
    submitted.subscribe(
      tag => {
        this.submitted.emit(tag);
        // this.dialogService.alert(msgSuccess);
        // TODO use a popup
      },
      error => {
        console.error(JSON.stringify(error));
        this.dialogService.alert(`${msgError} : code ${error.status}`);
      }
    );
  }

  private setLabels(labels: Set<string>): void {
    if (labels && labels.size !== 0) {
      const labelsFGs: FormGroup[] = []
      labels.forEach(label => {
        labelsFGs.push(this.fb.group({'label': label}));
      })
      const labelFormArray = this.fb.array(labelsFGs);
      this.form.setControl('labels', labelFormArray);
    } else {
      this.form.setControl('labels', this.fb.array([]));
    }
  }

}
