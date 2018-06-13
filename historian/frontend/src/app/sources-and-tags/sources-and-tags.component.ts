import { Component, OnInit } from '@angular/core';

import { Dataset } from '../dataset/dataset';
import { DatasetService } from '../dataset/dataset.service';

@Component({
  templateUrl: './sources-and-tags.component.html',
  styleUrls: ['./sources-and-tags.component.css'],
})
export class SourcesAndTagsComponent implements OnInit {

  dataset: Dataset;

  constructor(private datasetService: DatasetService) { }


  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataset = dataSet);
  }

  datasetIsEmpty(): boolean {
    return this.dataset.isEmpty();
  }
}
