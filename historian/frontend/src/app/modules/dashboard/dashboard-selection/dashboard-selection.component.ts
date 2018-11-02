import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { Dropdown } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ProfilService } from '../../../profil/profil.service';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../../../core/modele/dashboard/Dashboard';
import { IModification, Operation } from '../../datasource/ConfigurationToApply';
import { tap } from 'rxjs/operators';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.css']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards: Dashboard[];

  @Input() selectedDashboard: Dashboard;
  @Output() dashboardChange = new EventEmitter<Dashboard>();
  @Output() dashboardUpdated = new EventEmitter<Dashboard>();
  @Output() dashboardChangeAfterDelete = new EventEmitter<Dashboard>();
  // Form to add new selection of tags
  displayAdd = false;
  addDashboardQuestions: QuestionBase<any>[];
  displayEdit = false;
  editDashboardQuestions: QuestionBase<any>[];

  private CANCEL_MSG = 'Cancel';
  private REMOVE_DASHBOARD_MSG = 'Remove dashboard';
  addOperation: Operation = Operation.CREATE;
  editOperation: Operation = Operation.UPDATE;

  @ViewChild(Dropdown)
  dropDown: Dropdown;

  constructor(private confirmationService: ConfirmationService,
              private dashboardService: DashboardService,
              public profilService: ProfilService,
              protected messageService: MessageService) {}

  ngOnInit() {
    this.addDashboardQuestions = this.getAddQuestions();
    this.editDashboardQuestions = this.getAddQuestions(); // TODO
    this.dashboardService.getAll().subscribe(dashboards => {
      this.dashboards = dashboards;
    });
  }

  showAddDialog() {
    this.displayAdd = true;
  }

  closeAddDialog() {
    this.displayAdd = false;
  }

  showEditDialog() {
    this.displayEdit = true;
  }

  closeEditDialog() {
    this.displayEdit = false;
  }

  onDashboardSaved(selectionModif: IModification<Dashboard>) {
    this.dashboardService.save(selectionModif.item).pipe(
      tap(dashboard => {
        this.dashboardService.getAll().subscribe(dashboards => {
          this.dashboards = dashboards;
          this.selectedDashboard = dashboard;
          this.dashboardChange.emit(this.selectedDashboard);
          this.closeAddDialog();
        });
      }),
    ).subscribe(
      success => {},
      err => this.dashboardService.handleSaveError(err, this.messageService),
      () => { }
    );
  }

  onDashboardUpdated(selectionModif: IModification<Dashboard>) {
    this.dashboardService.update(selectionModif.item, selectionModif.item.id).pipe(
      tap(dashboard => {
        this.dashboardService.getAll().subscribe(dashboards => {
          this.dashboards = dashboards;
          this.selectedDashboard = dashboard;
          this.dashboardUpdated.emit(this.selectedDashboard);
          this.closeEditDialog();
        });
      })
    ).subscribe(
      success => {},
      err => this.dashboardService.handleUpdateError(err, this.messageService),
      () => { }
    );
  }

  delete(dashboard: Dashboard) {
    const desc = dashboard.description ? ` (${dashboard.description})` : '';
    const msg = `Delete dashboard '${dashboard.name}'${desc} ?`;
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: this.CANCEL_MSG,
      acceptLabel: this.REMOVE_DASHBOARD_MSG,
      accept: () => {
        this.dashboardService.delete(dashboard.id)
          .subscribe(deletedDashboard => {
            this.dashboardService.getAll().subscribe(dashboards => {
              this.dashboards = dashboards;
              this.selectedDashboard = dashboard;
              if (dashboards.length === 0) {
                this.dashboardChangeAfterDelete.emit(null);
              } else {
                this.dashboardChangeAfterDelete.emit(dashboards[0]);
              }
            });
          });
      },
      reject: () => { }
    });
  }

  onSelectionChange(event) {
    this.dashboardChange.emit(event.value);
  }

  private getAddQuestions(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        placeholder: 'name for the dashboard',
        order: 1,
        required: true,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        placeholder: 'description...',
        required: false,
        order: 2
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
