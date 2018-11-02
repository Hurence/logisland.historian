import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from '../../../core/modele/dashboard/Dashboard';
import { BaseDynamicFormComponentEmitter } from '../../../shared/dynamic-form/BaseDynamicFormComponentEmitter';
import { Operation } from '../../datasource/ConfigurationToApply';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { ConfirmationService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { timeRangeBuiltIn } from '../../../shared/time-range-selection/time-range-filter';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.css']
})
export class DashboardFormComponent extends BaseDynamicFormComponentEmitter<Dashboard> {

  @Input() formOperation: Operation = Operation.CREATE;
  @Input() defaultAutorefresh: number = 10000;
  @Input() defaultFrom: string = timeRangeBuiltIn.LAST_15_MINUTES.start;
  @Input() defaultTo: string = timeRangeBuiltIn.LAST_15_MINUTES.end;

  constructor(protected qcs: QuestionControlService,
    protected confirmationService: ConfirmationService,
    private keycloakService: KeycloakService) {
      super(qcs, confirmationService);
    }

  protected create(): Dashboard {
    return {
      id: 'unused id',
      name: '',
      owner: this.keycloakService.getUsername(),
      description: '',
      from: this.defaultFrom,
      to: this.defaultTo,
      autorefresh: this.defaultAutorefresh, // long
      panels: []
    };
  }
}
