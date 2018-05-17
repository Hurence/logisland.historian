import { Component, OnInit, ViewChild } from '@angular/core';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service.';
import { Datasource } from '../Datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasourceFormComponent } from '../datasource-form/datasource-form.component';
import { DialogService } from '../../dialog.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit {

  selectedDatasource: Datasource;
  dataSet: Dataset;
  @ViewChild(DatasourceFormComponent)
  dsFrmComp: DatasourceFormComponent;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
  }

  onSelectDatasource(datasource: Datasource) {
    if (this.dsFormIsClean()) {
      this.selectedDatasource = datasource;
      this.dsFrmComp.isReachable();  
    } else {
      let canSwitch = this.canDeactivate()
      if (typeof canSwitch === "boolean") {
        if (canSwitch) {      
          this.selectedDatasource = datasource;
          this.dsFrmComp.isReachable();  
        } else {
          console.log('user cancelled selection change');
        }
      }
      else {
        canSwitch.subscribe(bool => {
          if (bool) {
            this.selectedDatasource = datasource;
            this.dsFrmComp.isReachable();  
          } else {
            console.log('user cancelled selection change');
          }
        })
      }
      
    }
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  datasetIsEmpty(): boolean {
    return this.dataSet.isEmpty();
  }

  dsFormIsClean(): Boolean {
    return !this.dsFrmComp.formIsClean();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dsFormIsClean()) return true;
    return this.dialogService.confirm('Discard changes?');
  }
}
