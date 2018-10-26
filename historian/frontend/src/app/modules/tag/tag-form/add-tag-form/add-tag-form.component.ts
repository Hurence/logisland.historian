import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { BaseSingleTagForm } from '../BaseSingleTagForm';
import { Operation } from '../../../datasource/ConfigurationToApply';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent extends BaseSingleTagForm implements OnInit {
  formOperation: Operation = Operation.CREATE;

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService,
              protected tagOpcService: TagOpcService) {
    super(qcs, confirmationService, tagOpcService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
