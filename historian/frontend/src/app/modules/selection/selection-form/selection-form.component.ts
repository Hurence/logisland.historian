import { Component, OnInit } from '@angular/core';

import { BaseDynamicFormComponent } from '../../../shared/dynamic-form/BaseDynamicFormComponent';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { TagsSelection, TagsSelectionArray } from '../Selection';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css']
})
export class SelectionFormComponent extends BaseDynamicFormComponent<TagsSelection, TagsSelectionArray> {

  constructor(protected qcs: QuestionControlService,
              protected service: SelectionService) {
    super(qcs, service);
  }

  protected create(item: TagsSelection): TagsSelectionArray {
    return new TagsSelectionArray(item);
  }

  protected convert(backObj: TagsSelectionArray): TagsSelection {
    return new TagsSelection(backObj);
  }
}
