import { Component, OnInit } from '@angular/core';
import { BaseDynamicFormComponent } from '../../../../shared/dynamic-form/BaseDynamicFormComponent';
import { HistorianTag } from '../../modele/HistorianTag';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent extends BaseDynamicFormComponent<HistorianTag, HistorianTag> {

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
    this.loading = true;
    this.tagOpcService.searchForTag(tagWithNodeId.datasource_id, tagWithNodeId.node_id).pipe(
      map(opcTag => new HistorianTag(opcTag))
    ).subscribe(
      historianTag => {
        this.form.reset(historianTag);
        this.displaySucsess();
      },
      error => {
        // const httpError = (<HttpErrorResponse> error)
        this.displayError(`No node found with id '${this.form.value.node_id}'`);
        console.error(JSON.stringify(error));
      }
    );
  }

  displaySucsess(): void {
    this.displayNotFoundMsg = false;
    this.loading = false;
    this.canSubmit = true;
  }

  displayError(error: string): void {
    this.nodeFoundMsd = error;
    this.canSubmit = false;
    this.loading = false;
    this.displayNotFoundMsg = true;
  }

  resetDisplay(): void {
    this.canSubmit = false;
    this.loading = false;
    this.displayNotFoundMsg = false;
  }

  protected create(item: HistorianTag): HistorianTag {
    return new HistorianTag(item);
  }

  protected convert(backObj: HistorianTag): HistorianTag {
    return new HistorianTag(backObj);
  }
}
