import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BaseDynamicFormComponent } from '../../../../shared/dynamic-form/BaseDynamicFormComponent';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { HistorianTag } from '../../modele/HistorianTag';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { ConfirmationService } from 'primeng/api';
import { BaseSingleTagForm } from '../BaseSingleTagForm';

@Component({
  selector: 'app-edit-tag-form',
  templateUrl: './edit-tag-form.component.html',
  styleUrls: ['./edit-tag-form.component.css']
})
export class EditTagFormComponent extends BaseSingleTagForm implements OnInit {

  constructor(protected qcs: QuestionControlService,
              protected service: TagHistorianService,
              protected confirmationService: ConfirmationService,
              protected tagOpcService: TagOpcService) {
    super(qcs, service, confirmationService, tagOpcService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
