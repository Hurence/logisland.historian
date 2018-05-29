import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DialogService } from '../../dialog/dialog.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../shared/dynamic-form/question-control.service';
import { Tag } from '../tag';
import { Observable } from 'rxjs';
import { TagService } from '../tag.service';

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
  @Output() submitted = new EventEmitter<Tag>();
  payLoad = '';

  constructor(private qcs: QuestionControlService,
              private dialogService: DialogService,
              private tagService: TagService) { }

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

  /* save datasource when submitting */
  onSubmit() {
    const tag = Object.assign({} ,this.tag);
    Object.assign(tag, this.form.value);
    console.log('tag to be saved :', tag)
    this.payLoad = JSON.stringify(tag);//TODO remove when test over
    this.subscribeToUpdate(this.tagService.save(tag),
      'successfully saved tag',
      'error while saving data source.');
  }

  /* Return a datasource based on formulaire inputs */
  // private prepareSaveDatasource(): Tag {
  //   const formModel = this.form.getRawValue();

  //   formModel
  //   const saveDatasource: Tag = {
  //     id: formModel.name || this.tag.id, // when disabled
  //     description: formModel.description,
  //     host: formModel.host,
  //     domain: formModel.domain,
  //     clsid: formModel.clsid,
  //     progId: formModel.progId,
  //     user: formModel.auth.user,
  //     password: formModel.auth.password,
  //     record_type: 'datasource',
  //     datasource_type: formModel.type
  //   };
  //   return saveDatasource;
  // }
  /* subscribe to update or save request
     emitting saved datasource, testing if it is reachable then alerting user when it is done.
  */
  private subscribeToUpdate(submitted: Observable<Tag>,
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
