import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { BaseSingleTagForm } from '../BaseSingleTagForm';
import { Operation } from '../../../datasource/ConfigurationToApply';

@Component({
  selector: 'app-edit-tag-form',
  templateUrl: './edit-tag-form.component.html',
  styleUrls: ['./edit-tag-form.component.css']
})
export class EditTagFormComponent extends BaseSingleTagForm implements OnInit {
  formOperation: Operation = Operation.UPDATE;

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService,
              protected tagOpcService: TagOpcService) {
    super(qcs, confirmationService, tagOpcService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
