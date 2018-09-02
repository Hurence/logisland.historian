import { OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { map } from 'rxjs/operators';

import { BaseDynamicFormComponentEmitter } from '../../../shared/dynamic-form/BaseDynamicFormComponentEmitter';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { HistorianTag } from '../modele/HistorianTag';
import { TagOpcService } from '../service/tag-opc.service';

export abstract class BaseSingleTagForm extends BaseDynamicFormComponentEmitter<HistorianTag> implements OnInit {

  displayFoundMsg = false;
  displayNotFoundMsg = false;
  nodeFoundMsd = 'RAS';
  loading = false;

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService,
              protected tagOpcService: TagOpcService) {
    super(qcs, confirmationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.copyNodeIdToTagName();
  }

  onFetchMetaData() {
    const tagWithNodeId = this.prepareSaveItem();
    this.displayLoading();
    this.tagOpcService.searchForTag(tagWithNodeId.datasource_id, tagWithNodeId.node_id).pipe(
      map(opcTag => new HistorianTag(opcTag))
    ).subscribe(
      historianTag => {
        historianTag.node_id = this.form.value.node_id;
        historianTag.update_rate = this.form.value.update_rate;
        historianTag.polling_mode = this.form.value.polling_mode;
        historianTag.enabled = this.form.value.enabled;
        this.form.patchValue(historianTag);
        this.displaySucess();
        // Questions.modifyQuestions(this.questions, AddTagFormComponent.QUESTION_AFTER_FETCHING_DATA);
      },
      error => {
        // const httpError = (<HttpErrorResponse> error)
        this.displayError(`No node found with id '${this.form.value.node_id}'`);
        console.error(JSON.stringify(error));
      }
    );
  }

  resetDisplay(): void {
    this.displayFoundMsg = false;
    this.loading = false;
    this.displayNotFoundMsg = false;
    // Questions.modifyQuestions(this.questions, AddTagFormComponent.QUESTION_BEFORE_FETCHING_DATA);
  }

  private copyNodeIdToTagName(): void {
    this.form.get('node_id').valueChanges.forEach(
      (nodeId: string) => {
        this.form.get('tag_name').patchValue(nodeId);
    });
  }

  private displayLoading(): void {
    this.displayNotFoundMsg = false;
    this.displayFoundMsg = false;
    this.loading = true;
  }

  private displaySucess(): void {
    this.displayNotFoundMsg = false;
    this.loading = false;
    this.displayFoundMsg = true;
  }

  private displayError(error: string): void {
    this.nodeFoundMsd = error;
    this.displayFoundMsg = false;
    this.loading = false;
    this.displayNotFoundMsg = true;
  }

  protected create(): HistorianTag {
    return new HistorianTag();
  }
}
