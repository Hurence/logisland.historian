import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { BaseDynamicFormComponentEmitter } from '../../../shared/dynamic-form/BaseDynamicFormComponentEmitter';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { Operation } from '../../datasource/ConfigurationToApply';
import { TagsSelection } from '../Selection';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css']
})
export class SelectionFormComponent extends BaseDynamicFormComponentEmitter<TagsSelection> {
  protected formOperation: Operation = Operation.CREATE;

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService) {
    super(qcs, confirmationService);
  }

  protected create(): TagsSelection {
    return new TagsSelection();
  }
}
