import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { interval, from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineAll, map, take, concat } from 'rxjs/operators';

import { Dataset } from '../../dataset/dataset';
import { DialogService } from '../../dialog/dialog.service';
import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { TreeTagService } from './tree-view-tag.service';
import { JsTreeComponent } from '../../shared/js-tree/js-tree.component';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  treeDataTag$: Observable<any>;
  tagsMap: Map<string/*datasource Id*/, Observable<Tag[]>>;

  // tags$: Observable<Tag[]>;
  @Input() dataSet: Dataset;
  @Input() selectedTags: Set<Tag>;
  @Output() selectedTagsE = new EventEmitter<Tag>();
  @ViewChild(JsTreeComponent) public dataTreeComp: JsTreeComponent;

  constructor(private tagService: TagService,
              private dialogService: DialogService,
              private treeTagService: TreeTagService) {
                this.tagsMap = new Map();
              }

  ngOnInit() {
    this.getTags();
    this.treeDataTag$ = this.treeTagService.buildTree(this.createTreeTag(), this.selectedTagsE)
    this.initializeOnChangeTreeEvent();
  }

  
  getTags(): void {
    this.dataSet.datasourceIds.forEach((id, idAgain, set) => {
      this.tagsMap.set(id, this.tagService.getTagsFromDatasource(id));
    });
  }

  getTagsQuery(query: string): void {
    this.dataSet.datasourceIds.forEach((id, idAgain, set) => {
      this.tagsMap.set(id, this.tagService.getTagsFromDatasourceQuery(id, query));
    });
  }

  isSelected(tag: Tag): boolean {
    return this.selectedTags.has(tag);
  }
 /* workaround to avoid problem using ngFor with iterables
    https://github.com/angular/angular/issues/13877
 */
  datasourcesId(): string[] {
    return Array.from(this.tagsMap.keys()); 
  }

  onSelect(tag: Tag) {
    this.selectedTagsE.emit(tag);
  }

  private createTreeTag(): Observable<Tag[]> {
    const emptyObs: Observable<Tag[]> = from([]);
    return Array.from(this.tagsMap.values()).reduce((r, v, i, a) => {
      let myObs = r.pipe(concat(v));
      return myObs
    },
      emptyObs
    );
  }

  private initializeOnChangeTreeEvent() {
    $(this.dataTreeComp.dataTree.nativeElement)
      .on('changed.jstree', function (e, data) {
        if (data.selected.length) {
          const tag = data.instance.get_node(data.selected[0]).original.tag as Tag;
          if (tag) {
            const tagEmitter = data.instance.get_node(data.selected[0]).original.tagEmitter as EventEmitter<Tag>;
            tagEmitter.emit(tag);
          }
        }
      });
  }
}
