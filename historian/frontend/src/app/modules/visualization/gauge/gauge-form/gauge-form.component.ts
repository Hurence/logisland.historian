import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDynamicFormComponentEmitter } from '../../../../shared/dynamic-form/BaseDynamicFormComponentEmitter';
import { Operation } from '../../../datasource/ConfigurationToApply';
import { QuestionControlService } from '../../../../shared/dynamic-form/question-control.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ZoneRange, ZoneRangeColors } from '../../../graph/gauge-chart/gauge';
import { FormBuilder } from '@angular/forms';
import { HistorianTag } from '../../../tag/modele/HistorianTag';


export interface ZoneRangeConfig {
  from: number | HistorianTag;
  to: number | HistorianTag;
  color: ZoneRangeColors;
}

export interface BackendGaugeConfig {
  value: number | HistorianTag;
  min: number | HistorianTag;
  max: number | HistorianTag;
  zoneranges: ZoneRangeConfig[];
}

@Component({
  selector: 'app-gauge-form',
  templateUrl: './gauge-form.component.html',
  styleUrls: ['./gauge-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GaugeFormComponent extends BaseDynamicFormComponentEmitter<BackendGaugeConfig> {

  protected formOperation: Operation = Operation.UPDATE;

  constructor(protected qcs: QuestionControlService,
              protected confirmationService: ConfirmationService,
              private fb: FormBuilder) {
    super(qcs, confirmationService);
  }

  protected create(): BackendGaugeConfig {
    return {
      value: 500,
      min: 0,
      max: 1000,
      zoneranges : [
        { from: 0, to : 175, color: ZoneRangeColors.RED },
        { from: 175, to : 250, color: ZoneRangeColors.YELLOW },
        { from: 250, to : 750, color: ZoneRangeColors.GREEN },
        { from: 750, to : 825, color: ZoneRangeColors.YELLOW },
        { from: 825, to : 1000, color: ZoneRangeColors.RED }
      ]
    };
  }

  protected prepareSaveItem(): BackendGaugeConfig {
    const item: BackendGaugeConfig = this.create();
    Object.assign(item, this.item);
    Object.assign(item, this.form.value);
    return item;
  }

  protected rebuildForm(): void {
    const objForForm: any = Object.assign({}, this.item);
    const zoneRangesFGs = objForForm.zoneranges.map(z => this.fb.group(z));
    const zoneRangeFormArray = this.fb.array(zoneRangesFGs);
    this.form.setControl('zoneranges', zoneRangeFormArray);
    this.form.reset(objForForm);
  }

}
