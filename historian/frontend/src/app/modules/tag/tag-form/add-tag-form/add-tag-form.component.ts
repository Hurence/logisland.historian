import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { BaseDynamicFormComponent } from '../../../../shared/dynamic-form/BaseDynamicFormComponent';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { HistorianTag } from '../../modele/HistorianTag';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { Questions } from '../../../../shared/dynamic-form/question-helper';
import { IQuestionBase } from '../../../../shared/dynamic-form/question-base';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent extends BaseDynamicFormComponent<HistorianTag, HistorianTag> {

  private static QUESTION_BEFORE_FETCHING_DATA = new Map<string, IQuestionBase<any>>([
    ["node_id", { key: "node_id", readonly: false}],
    ["update_rate", { key: "update_rate", readonly: true}],
    ["description", { key: "description", readonly: true}],
  ])

  private static QUESTION_AFTER_FETCHING_DATA = new Map<string, IQuestionBase<any>>([
    ["node_id", { key: "node_id", readonly: true}],
    ["update_rate", { key: "update_rate", readonly: false}],
    ["description", { key: "description", readonly: false}],
  ])

  canSubmit = false;
  displayNotFoundMsg = false;
  nodeFoundMsd = 'RAS';
  loading = false;

  constructor(protected qcs: QuestionControlService,
              protected service: TagHistorianService,
              protected tagOpcService: TagOpcService) {
    super(qcs, service);
    this.canSubmit = false;
  }

  onFetchMetaData() {
    const tagWithNodeId = this.prepareSaveItem();
    this.displayLoading();
    this.tagOpcService.searchForTag(tagWithNodeId.datasource_id, tagWithNodeId.node_id).pipe(
      map(opcTag => new HistorianTag(opcTag))
    ).subscribe(
      historianTag => {
        this.form.reset(historianTag);
        this.displaySucess();
        Questions.modifyQuestions(this.questions, AddTagFormComponent.QUESTION_AFTER_FETCHING_DATA);
      },
      error => {
        // const httpError = (<HttpErrorResponse> error)
        this.displayError(`No node found with id '${this.form.value.node_id}'`);
        console.error(JSON.stringify(error));
      }
    );
  }

  resetDisplay(): void {
    this.canSubmit = false;
    this.loading = false;
    this.displayNotFoundMsg = false;
    Questions.modifyQuestions(this.questions, AddTagFormComponent.QUESTION_BEFORE_FETCHING_DATA);
  }

  private displayLoading(): void {
    this.displayNotFoundMsg = false;
    this.canSubmit = false;
    this.loading = true;
  }

  private displaySucess(): void {
    this.displayNotFoundMsg = false;
    this.loading = false;
    this.canSubmit = true;
  }

  private displayError(error: string): void {
    this.nodeFoundMsd = error;
    this.canSubmit = false;
    this.loading = false;
    this.displayNotFoundMsg = true;
  }

  protected create(item: HistorianTag): HistorianTag {
    return new HistorianTag(item);
  }

  protected convert(backObj: HistorianTag): HistorianTag {
    return new HistorianTag(backObj);
  }
}
