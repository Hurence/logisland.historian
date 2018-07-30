import { Component, OnInit } from '@angular/core';
import { BaseDynamicFormComponent } from '../../../../shared/dynamic-form/BaseDynamicFormComponent';
import { HistorianTag } from '../../modele/HistorianTag';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagOpcService } from '../../service/tag-opc.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent extends BaseDynamicFormComponent<HistorianTag, HistorianTag> {

  constructor(protected qcs: QuestionControlService,
              protected service: TagHistorianService,
              protected tagOpcService: TagOpcService) {
    super(qcs, service);
  }

  onSubmit() {
    const objToSave: HistorianTag = this.prepareSaveItem();
    this.tagOpcService.searchForTag(objToSave.datasource_id, objToSave.id).pipe(
      map(opcTag => new HistorianTag(opcTag))
    ).subscribe(
      obj => {
        const converted = this.convert(obj);
        this.item = converted;
        this.submitted.emit(converted);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  protected create(item: HistorianTag): HistorianTag {
    return new HistorianTag(item);
  }

  protected convert(backObj: HistorianTag): HistorianTag {
    return new HistorianTag(backObj);
  }
}
