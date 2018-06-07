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
import { INodeTree } from '../../shared/js-tree/NodeTree';
import { tap } from 'rxjs/operators';

export interface TreeTagSelect {
  clickedTag: ITag;
  selectedTags: ITag[];
}

@Component({
  selector: 'app-tag-tree',
  templateUrl: './tag-tree.component.html',
  styleUrls: ['./tag-tree.component.css']
})
export class TagTreeComponent implements OnInit, OnDestroy {


  treeDataTag: INodeTree;

  @Input() dataSet: Dataset;
  @Output() selectedTagsE = new EventEmitter<TreeTagSelect>();
  @ViewChild(JsTreeComponent) public dataTreeComp: JsTreeComponent;
  private modifiedCheckedNodes = new Subject<any>();

  constructor(private tagService: TagService,
              private treeTagService: TreeTagService) {}

  ngOnInit() {
    this.initTree();
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

  refresh(): void {
    this.rebuildTree();
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

  private initTree(): void {
    this.rebuildTree();
    this.dataTreeComp.addEvent('changed.jstree', this.onChange.bind(this));
    this.dataTreeComp.addEvent('ready.jstree', this.onReady.bind(this));
    this.dataTreeComp.addEvent('create_node.jstree', this.onCreateNode.bind(this));
  }

  private rebuildTree(): void {
    const tags$: Observable<ITag[]> = this.tagService.gets(Array.from(this.dataSet.getDatasourceIds()));
    this.treeTagService.buildTree(tags$, this.dataSet).subscribe(tree => {
      this.treeDataTag = tree;
    });
  }
  /**
   * Emit tag selected when clicking on a node containing a Tag
   *
   * Idea: We could put reference of this component in every node instead of just tag emitter
   * so we have access to all methods
   *
   *  node
   * Object
   *
   * action
   * Object the action that caused the selection to change
   *
   * selected
   * Array the current selection
   *
   * event
   * Object the event (if any) that triggered this changed event
   *
   */
  private onChange(node, action, selected, event): void {
      console.log('onChange called');
      this.sendSelectedTags(node, action.instance, action.selected);
  }

  private sendSelectedTags(node, instance: any, selected: string[]): void {
    // find selected tags
    const selectetTags = [];
    selected.forEach(id => {
      const selecetedNode = instance.get_node(id);
      if (selecetedNode.original && selecetedNode.original.tag) {
        selectetTags.push(selecetedNode.original. tag);
      }
    });
    // find clicked tag if any
    let clickedTag = undefined;
    if (node && node.original && node.original.tag) {
      clickedTag = node.original.tag
    }
    // build and send info
    const emitItem = {
      clickedTag: clickedTag,
      selectedTags: selectetTags
    };
    this.selectedTagsE.emit(emitItem);
  }

  private onReady(e, data): void {
    this.dataSet.getTagIds().forEach(idNode => {
      data.instance._open_to(idNode);
    });
  }

  private onCreateNode(e, data): void {
    const tagIds: Set<string> = this.dataSet.getTagIds()
    tagIds.forEach(idNode => {
      data.instance._open_to(idNode);
    });
    this.sendSelectedTags(e, data.instance, Array.from(tagIds))
  }
}
