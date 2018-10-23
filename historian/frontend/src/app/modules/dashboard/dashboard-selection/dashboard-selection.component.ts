
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { Dropdown } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ProfilService } from '../../../profil/profil.service';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../modele/Dashboard';
import { IModification, Operation } from '../../datasource/ConfigurationToApply';
import { tap } from 'rxjs/operators';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';

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
  // Form to add new selection of tags
  display = false;
  addDashboardQuestions: QuestionBase<any>[];
  editDashboardQuestions: QuestionBase<any>[];

  private CANCEL_MSG = 'Cancel';
  private REMOVE_DASHBOARD_MSG = 'Remove dashboard';
  addOperation: Operation = Operation.CREATE;
  editOperation: Operation = Operation.UPDATE;

  @ViewChild(Dropdown)
  dropDown: Dropdown;

  constructor(private confirmationService: ConfirmationService,
              private dashboardService: DashboardService,
              public profilService: ProfilService) {}

  ngOnInit() {
    this.addDashboardQuestions = this.getAddQuestions();
    this.editDashboardQuestions = this.getAddQuestions(); // TODO
    this.dashboardService.getAll().subscribe(dashboards => {
      this.dashboards = dashboards;
    });
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  actualizeListOfTagsSelection() {
    this.dashboardService.getAll().subscribe(dashboards => {
      this.dashboards = dashboards;
      if (this.dashboards.length !== 0) {
        if (this.selectedDashboard) {
          // const optionSelected = this.dashboards.find(s => s.value.name === selectionIdSelected);
          // if (optionSelected) {
          //   dashboardSelected = optionSelected.value;
          // } else {
          //   dashboardSelected = this.dashboards[0].value;
          // }
        } else {
          this.selectedDashboard = this.dashboards[0];
        }
      } else {
        this.selectedDashboard = null;
      }
      this.dashboardChange.emit(this.selectedDashboard);
    });
  }

  onDashboardSaved(selectionModif: IModification<Dashboard>) {
    this.dashboardService.save(selectionModif.item).pipe(
      tap(dashboard => {
        this.actualizeListOfTagsSelection();
        this.selectedDashboard = dashboard;
        this.closeDialog();
      })
    ).subscribe();
  }

  onDashboardUpdated(selectionModif: IModification<Dashboard>) {
    this.dashboardService.update(selectionModif.item, selectionModif.item.id).pipe(
      tap(dashboard => {
        this.actualizeListOfTagsSelection();
        this.selectedDashboard = dashboard;
        this.closeDialog();
      })
    ).subscribe();
  }

  delete(dashboard: Dashboard) {
    const msg = `Delete selection of tags ${dashboard.name} (${dashboard.description}) ?`;
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: this.CANCEL_MSG,
      acceptLabel: this.REMOVE_DASHBOARD_MSG,
      accept: () => {
        this.dashboardService.delete(dashboard.id)
          .subscribe(deletedDashboard => {
            this.actualizeListOfTagsSelection();
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
