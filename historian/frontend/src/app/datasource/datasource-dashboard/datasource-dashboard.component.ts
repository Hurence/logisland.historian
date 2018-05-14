import { Component, OnInit } from '@angular/core';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service.';
import { Datasource } from '../Datasource';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit {

  selectedDatasource: Datasource;
  dataSet: Dataset;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
  }

  onSelectDatasource(datasource: Datasource) {
    this.selectedDatasource = datasource;
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  datasetIsEmpty(): boolean {
    return this.dataSet.isEmpty();
  }
}
