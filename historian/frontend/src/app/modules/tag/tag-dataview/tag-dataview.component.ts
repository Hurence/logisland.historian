import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Subscription } from 'rxjs';

import { HistorianTag } from '../modele/HistorianTag';


@Component({
  selector: 'app-tag-dataview',
  templateUrl: './tag-dataview.component.html',
  styleUrls: ['./tag-dataview.component.css']
})
export class TagDataviewComponent implements OnInit {

  totalRecords: number; // for dataview comp

  sortOptions: SelectItem[]; // for dropdown comp
  sortKey: string; // for dropdown comp
  sortField = 'tag_name'; // for dataview comp
  sortOrder: number; // for dataview comp

  @Input() refreshRate: number; // in milli
  @Input() tags: HistorianTag[];

  loading: boolean; // for dataview comp

  layout: string; // for dataview comp

  protected changeSelectionSubscription: Subscription;
  protected addTagSubscription: Subscription;
  protected removeTagSubscription: Subscription;

  constructor() {
    this.loading = false;
    this.layout = 'grid';
  }

  ngOnInit() {
    this.sortOptions = [
      {label: 'Name', value: 'tag_name'},
      {label: 'Alphabetical Description', value: '!description'},
      {label: 'Reverse Alphabetical Description', value: 'description'},
      {label: 'Domain', value: 'domain'},
      {label: 'Type', value: 'data_type'},
      {label: 'Reverse Type', value: '!data_type'},
    ];
  }

  // loadData(event) {
  //   console.log('load with event:', event);
  //   const firstIndex = event.first;
  //   const numberToTake = event.rows;
  //   this.tagService.getAll().subscribe(tags => {
  //     this.tags = tags.slice(firstIndex, firstIndex + numberToTake);
  //     this.totalRecords = tags.length;
  //   });
  // }

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
