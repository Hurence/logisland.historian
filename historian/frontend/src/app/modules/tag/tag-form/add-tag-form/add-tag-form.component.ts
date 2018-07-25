import { Component, OnInit } from '@angular/core';
import { BaseDynamicFormComponent } from '../../../../shared/dynamic-form/BaseDynamicFormComponent';
import { HistorianTag } from '../../modele/HistorianTag';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { TagHistorianService } from '../../service/tag-historian.service';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent extends BaseDynamicFormComponent<HistorianTag, HistorianTag> {

  constructor(protected qcs: QuestionControlService,
              protected service: TagHistorianService) {
    super(qcs, service);
  }

  protected create(item: HistorianTag): HistorianTag {
    return new HistorianTag(item);
  }

  protected convert(backObj: HistorianTag): HistorianTag {
    return new HistorianTag(backObj);
  }
}
