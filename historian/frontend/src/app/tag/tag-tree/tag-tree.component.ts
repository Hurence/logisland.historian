import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { debounceTime, tap } from 'rxjs/operators';

import { Dataset } from '../../dataset/dataset';
import { JsTreeComponent } from '../../shared/js-tree/js-tree.component';
import { ITag } from '../modele/tag';
import { TagService } from '../service/tag.service';
import { TreeTagService } from './tree-view-tag.service';

export interface TreeTagSelect {
  clickedTag: ITag; // undefined if none
  selectedTags: ITag[];
}

@Component({
  selector: 'app-tag-tree',
  templateUrl: './tag-tree.component.html',
  styleUrls: ['./tag-tree.component.css']
})
export class TagTreeComponent implements OnInit, OnDestroy {


  treeDataTag$: Observable<any>; // TODO create a specific type

  @Input() dataSet: Dataset;
  @Output() selectedTagsE = new EventEmitter<TreeTagSelect>();
  @ViewChild(JsTreeComponent) public dataTreeComp: JsTreeComponent;
  private modifiedCheckedNodes = new Subject<any>();

  constructor(private tagService: TagService,
              private treeTagService: TreeTagService) {}

  ngOnInit() {
    this.buildTree();
    this.dataTreeComp.addEvent('changed.jstree', this.onChange.bind(this));
    this.dataTreeComp.addEvent('ready.jstree', this.onReady.bind(this));
  }

  ngOnDestroy(): void {
    if (this.modifiedCheckedNodes) {
      this.modifiedCheckedNodes.unsubscribe();
    }
  }

  onAddToDataset(): void {
    this.getSelectedTagsId().forEach(id => {
      this.dataSet.addTag(id);
    });
  }

  onRemoveFromDataset(): void {
    this.getSelectedTagsId().forEach(id => {
      this.dataSet.removeTag(id);
    });
  }

  private getSelectedTagsId(): string[] {
    return this.dataTreeComp.getBottomSelectedNodesId();
  }

  private buildTree(): void {
    const tags: Observable<ITag[]> = this.tagService.gets(Array.from(this.dataSet.getDatasourceIds()));
    this.treeDataTag$ = this.treeTagService.buildTree(tags, this.dataSet);
  }
  /**
   * Emit tag selected when clicking on a node containing a Tag
   *
   * Idea: We could put reference of this component in every node instead of just tag emitter
   * so we have access to all methods
   */
  private onChange(e, data): void {
      console.log('onChange called');
      const node = data.node;
      if (node && node.original && node.original.tag) {
        const emitItem = {
          clickedTag: node.original.tag, // undefined if none
          selectedTags: data.selected.map(id => data.instance.get_node(id).original.tag),
        };
        this.selectedTagsE.emit(emitItem);
      }
  }

  private onReady(e, data): void {
    this.dataSet.getTagIds().forEach(idNode => {
      data.instance._open_to(idNode);
    });
  }

  private addCheckedNodeToDataset(instance): void {
    const selectedTags = instance.get_bottom_checked();
    this.dataSet.replaceTags(selectedTags);
  }
}
