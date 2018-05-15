import { Component, OnInit, ViewChild } from '@angular/core';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service.';
import { Datasource } from '../Datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasourceFormComponent } from '../datasource-form/datasource-form.component';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
  }

  onSelectDatasource(datasource: Datasource) {
    this.selectedDatasource = datasource;
    this.dsFrmComp.isReachable();
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  datasetIsEmpty(): boolean {
    return this.dataSet.isEmpty();
  }
}
