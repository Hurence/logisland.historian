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
  selector: 'app-tag-tree',
  templateUrl: './tag-tree.component.html',
  styleUrls: ['./tag-tree.component.css']
})
export class TagTreeComponent implements OnInit {

  treeDataTag$: Observable<any>;//TODO create a specific type
  private tagsMap: Map<string/*datasource Id*/, Observable<Tag[]>>;

  @Input() dataSet: Dataset;
  @Input() selectedTags: Set<Tag>;
  @Output() selectedTagsE = new EventEmitter<Tag>();
  @ViewChild(JsTreeComponent) public dataTreeComp: JsTreeComponent;

  constructor(private tagService: TagService,              
              private treeTagService: TreeTagService) {
                this.tagsMap = new Map();
              }

  ngOnInit() {
    this.getTags();
    this.treeDataTag$ = this.treeTagService.buildTree(this.getAllTags(), this.selectedTagsE)
    this.initializeOnChangeTreeEvent();
  }

  
  getTags(): void {
    this.dataSet.datasourceIds.forEach((id, idAgain, set) => {
      this.tagsMap.set(id, this.tagService.getTagsFromDatasource(id));
    });
  }
  /**
   * get all tags from all selected datasources
   */
  private getAllTags(): Observable<Tag[]> {
    const emptyObs: Observable<Tag[]> = from([]);
    return Array.from(this.tagsMap.values()).reduce((r, v, i, a) => {
      let myObs = r.pipe(concat(v));
      return myObs
    },
      emptyObs
    );
  }
  /** 
   * Emit tag selected when clicking on a node containing a Tag
   * 
   * Idea: We could put reference of this component in every node instead of just tag emitter 
   * so we have access to all methods         
   */
  private initializeOnChangeTreeEvent() {
    this.dataTreeComp.addEvent('changed.jstree', function (e, data) {
      if (data.selected.length) {
        const tag = data.instance.get_node(data.selected[0]).original.tag as Tag;
        if (tag) {
          const tagEmitter = data.instance.get_node(data.selected[0]).original.tagEmitter as EventEmitter<Tag>;
          tagEmitter.emit(tag);
        }
      }
    })
  }
}
