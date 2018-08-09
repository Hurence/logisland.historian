import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Subscription } from 'rxjs';

import { ProfilService } from '../../../profil/profil.service';
import { ArrayUtil } from '../../../shared/array-util';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';
import { AbsSubscriberToSelectionOfTag } from '../../../core/AbsSubscriberToSelectionOfTag';

@Component({
  selector: 'app-tag-dataview',
  templateUrl: './tag-dataview.component.html',
  styleUrls: ['./tag-dataview.component.css']
})
export class TagDataviewComponent extends AbsSubscriberToSelectionOfTag implements OnInit, OnDestroy {

  tags: IHistorianTag[]; // for dataview comp
  totalRecords: number; // for dataview comp

  sortOptions: SelectItem[]; // for dropdown comp
  sortKey: string; // for dropdown comp
  sortField = 'tag_name'; // for dataview comp
  sortOrder: number; // for dataview comp

  @Input() refreshRate: number; // in milli

  loading: boolean; // for dataview comp

  layout: string; // for dataview comp

  protected changeSelectionSubscription: Subscription;
  protected addTagSubscription: Subscription;
  protected removeTagSubscription: Subscription;

  constructor(private tagService: TagHistorianService,
              protected profilService: ProfilService,
              private arrayUtil: ArrayUtil) {
    super(profilService);
    this.loading = true;
    this.layout = 'grid';
  }

  ngOnInit() {
    this.changeSelectionSubscription = this.profilService.getSelectionPublisher().subscribe(newSelection => {
      this.tags = newSelection.tags;
      this.totalRecords = this.tags.length;
      this.loading = false;
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
