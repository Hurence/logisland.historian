import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from '../modele/Dashboard';
import { BaseDynamicFormComponentEmitter } from '../../../shared/dynamic-form/BaseDynamicFormComponentEmitter';
import { Operation } from '../../datasource/ConfigurationToApply';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { ConfirmationService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.css']
})
export class DashboardFormComponent extends BaseDynamicFormComponentEmitter<Dashboard> {

  @Input() formOperation: Operation = Operation.CREATE;

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
      from: '',
      to: '',
      autorefresh: 0, // long
      panels: []
    };
  }
}
