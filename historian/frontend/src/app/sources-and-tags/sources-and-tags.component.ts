import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animation';
import { DatasetService } from '../dataset/dataset.service';
import { Dataset } from '../dataset/dataset';

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
  //TODO remove once stable
  showDataset(): string {
    return `datasourceIds: ${JSON.stringify(Array.from(this.dataset.getDatasourceIds()))}
            tagIds: ${JSON.stringify(Array.from(this.dataset.getTagIds()))}`;
  }

}
