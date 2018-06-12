import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../../can-deactivate-guard.service';
import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service';
import { DialogService } from '../../dialog/dialog.service';
import { ProfilService } from '../../profil/profil.service';
import { Datasource } from '../Datasource';
import { DatasourceFormComponent } from '../datasource-form/datasource-form.component';
import { DatasourcesListComponent } from '../datasources-list/datasources-list.component';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit, CanComponentDeactivate {

  selectedDatasource: Datasource;
  dataSet: Dataset;
  isCreation: boolean;
  filterPlaceHolder = 'Type to filter by type or by description...';

  @ViewChild(DatasourceFormComponent)
  private dsFrmComp: DatasourceFormComponent;
  @ViewChild(DatasourcesListComponent)
  private dslistComp: DatasourcesListComponent;
  private DISCARD_CHANGE_QUESTION_MSG = 'Discard changes ?';

  constructor(private datasetService: DatasetService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private profilService: ProfilService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
    this.isCreation = true;
    this.selectDatasource(null);
  }

  datasetIsEmpty(): boolean {
    return this.dataSet.isEmpty();
  }

  dsFormIsClean(): Boolean {
    return !this.dsFrmComp.formIsClean();
  }

  onSelectDatasource(datasource: Datasource) {
    if (this.dsFormIsClean()) {
      this.selectDatasource(datasource);
    } else {
      const canSwitch = this.canDeactivate();
      if (typeof canSwitch === 'boolean') {
        if (canSwitch) {
          this.selectDatasource(datasource);
        }
      } else {
        canSwitch.subscribe(bool => {
          if (bool) {
            this.selectDatasource(datasource);
          }
        });
      }
    }
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onSubmitted(ds: Datasource) {
    this.dslistComp.getDatasources();
    this.selectedDatasource = ds;
    this.isCreation = false;
  }

  onClickAddDatasource() {
    this.onSelectDatasource(null);
  }

  onFilterQuery(query: string) {
    this.dslistComp.getDatasourcesQuery(query);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dsFormIsClean()) return true;
    return this.dialogService.confirm(this.DISCARD_CHANGE_QUESTION_MSG);
  }

  private selectDatasource(datasource: Datasource) {
    if (datasource === null || datasource.id === this.selectedDatasource.id) {
      this.isCreation = true;
      this.selectedDatasource = new Datasource('', 'OPC-DA');
    } else {
      this.isCreation = false;
      this.selectedDatasource = datasource;
    }
  }
}
