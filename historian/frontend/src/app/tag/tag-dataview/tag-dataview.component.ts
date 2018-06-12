import { Component, OnInit } from '@angular/core';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-tag-dataview',
  templateUrl: './tag-dataview.component.html',
  styleUrls: ['./tag-dataview.component.css']
})
export class TagDataviewComponent implements OnInit {

  tags: IHistorianTag[]; // for dataview comp
  totalRecords: number; // for dataview comp

  sortOptions: SelectItem[]; // for dropdown comp

  sortKey: string; // for dropdown comp

  sortField: string; // for dataview comp

  sortOrder: number; // for dataview comp

  loading: boolean; // for dataview comp

  layout: string; // for dataview comp

  constructor(private tagService: TagHistorianService) {
    this.loading = true;
    this.layout = 'grid';
  }

  ngOnInit() {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      // this.totalRecords = tags.length;
      this.loading = false;
    });

    this.sortOptions = [
      {label: 'Alphabetical Description', value: '!description'},
      {label: 'Reverse Alphabetical Description', value: 'description'},
      {label: 'Domain', value: 'domain'},
      {label: 'Type', value: 'data_type'},
      {label: 'Reverse Type', value: '!data_type'},
    ];
  }

  loadData(event) {
    console.log('load with event:', event);
    const firstIndex = event.first;
    const numberToTake = event.rows;
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags.slice(firstIndex, firstIndex + numberToTake);
      this.totalRecords = tags.length;
    });
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
