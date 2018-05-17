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

  private selectedDatasource: Datasource;
  private dataSet: Dataset;
  @ViewChild(DatasourceFormComponent)
  private dsFrmComp: DatasourceFormComponent;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
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

  onSelectDatasource(datasource: Datasource) {
    if (this.dsFormIsClean()) {  
      this.selectDatasource(datasource);
    } else {
      let canSwitch = this.canDeactivate()
      if (typeof canSwitch === "boolean") {
        if (canSwitch) {      
          this.selectDatasource(datasource);
        } else {
          console.debug('user cancelled selection change');
        }
      }
      else {
        canSwitch.subscribe(bool => {
          if (bool) {
            this.selectDatasource(datasource); 
          } else {
            console.debug('user cancelled selection change');
          }
        })
      }    
    }
  }
  private selectDatasource(datasource: Datasource) {
    if (datasource === null) {      
      this.selectedDatasource = new Datasource('', 'OPC-DA');      
      this.dsFrmComp.resetForm(this.selectedDatasource);  
    } else {
      this.selectedDatasource = datasource;    
    }
  }
}
