import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Dataset } from '../../../dataset/dataset';
import { DatasetService } from '../../../dataset/dataset.service';
import { TagsSelection } from '../../selection/Selection';
import { ProfilService } from '../../../profil/profil.service';
import { Subscription } from 'rxjs';
import { ArrayUtil } from '../../../shared/array-util';

@Component({
  selector: 'app-tag-dataview',
  templateUrl: './tag-dataview.component.html',
  styleUrls: ['./tag-dataview.component.css']
})
export class TagDataviewComponent implements OnInit, OnDestroy {

  tags: IHistorianTag[]; // for dataview comp
  totalRecords: number; // for dataview comp

  sortOptions: SelectItem[]; // for dropdown comp
  sortKey: string; // for dropdown comp
  sortField = 'tag_name'; // for dataview comp
  sortOrder: number; // for dataview comp

  refreshOptions: SelectItem[];
  refreshRate = 10000; // in milli

  loading: boolean; // for dataview comp

  layout: string; // for dataview comp

  private changeSelectionSubscription: Subscription;
  private addTagSubscription: Subscription;
  private removeTagSubscription: Subscription;

  constructor(private tagService: TagHistorianService,
              private profilService: ProfilService,
              private arrayUtil: ArrayUtil) {
    this.loading = true;
    this.layout = 'grid';
  }

  ngOnInit() {
    this.changeSelectionSubscription = this.profilService.getSelectionPublisher().subscribe(newSelection => {
      this.loading = true;
      this.tagService.getAllWithIds(newSelection.tagIdsArray).subscribe(tags => {
        this.tags = tags;
        this.totalRecords = this.tags.length;
        this.loading = false;
      });
    });
    this.addTagSubscription = this.profilService.getAddTagPublisher().subscribe(tag => {
      this.tags.push(tag);
      this.totalRecords = this.tags.length;
    });
    this.removeTagSubscription = this.profilService.getRemoveTagPublisher().subscribe(tag => {
      this.arrayUtil.remove(this.tags, elem => tag.id === elem.id);
      this.totalRecords = this.tags.length;
    });
    this.sortOptions = [
      {label: 'Name', value: 'tag_name'},
      {label: 'Alphabetical Description', value: '!description'},
      {label: 'Reverse Alphabetical Description', value: 'description'},
      {label: 'Domain', value: 'domain'},
      {label: 'Type', value: 'data_type'},
      {label: 'Reverse Type', value: '!data_type'},
    ];

    this.refreshOptions = [
      {label: '1 secondes', value: '1000'},
      {label: '5 secondes', value: '5000'},
      {label: '10 secondes', value: '10000'},
      {label: '60 secondes', value: '60000'},
    ];
  }

  ngOnDestroy() {
    this.changeSelectionSubscription.unsubscribe();
    this.addTagSubscription.unsubscribe();
    this.removeTagSubscription.unsubscribe();
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

  onRefreshChange(event) {
    const refreshRate = event.value; // convert into milli
    this.refreshRate = refreshRate;
  }
}
