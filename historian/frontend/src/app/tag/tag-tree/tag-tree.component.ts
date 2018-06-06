import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Dataset } from '../../dataset/dataset';
import { JsTreeComponent } from '../../shared/js-tree/js-tree.component';
import { IHistorianTag } from '../modele/HistorianTag';
import { ITag, Tag } from '../modele/tag';
import { TagService } from '../service/tag.service';
import { TreeTagService } from './tree-view-tag.service';
import { TypesName } from './TypesName';

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
    this.getSelectedHistorianTags().forEach(tag => {
      this.dataSet.addTag(tag.id);
      this.dataTreeComp.setType(tag.id, TypesName.TAG_IN_DATASET);
    });
  }

  onRemoveFromDataset(): void {
    this.getSelectedHistorianTags().forEach(tag => {
      this.dataSet.removeTag(tag.id);
      this.dataTreeComp.setType(tag.id, TypesName.TAG_HISTORIAN);
    });
  }

  private getSelectedHistorianTags(): IHistorianTag[] {
    const tags: IHistorianTag[] = [];
    this.dataTreeComp.getBottomSelectedNodes().map(node => {
      if (Tag.isHistorianTag(node.original.tag)) {
        tags.push(node.original.tag);
      }
    });
    return tags;
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
        const selectetTags = [];
        data.selected.forEach(id => {
          const selecetedNode = data.instance.get_node(id);
          if (selecetedNode.original && selecetedNode.original.tag) {
            selectetTags.push(selecetedNode.original.tag);
          }
        });
        const emitItem = {
          clickedTag: node.original.tag,
          selectedTags: selectetTags
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
