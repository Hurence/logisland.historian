import { Component, OnInit, Input } from '@angular/core';
import { Datasource } from '../Datasource';
import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service.';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit {

  selectedDatasource: Datasource;
  dataSet: Dataset;

  constructor(private datasetService: DatasetService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
  }

  onSelectDatasource(datasource: Datasource) {
    this.selectedDatasource = datasource;
  }

  
}
