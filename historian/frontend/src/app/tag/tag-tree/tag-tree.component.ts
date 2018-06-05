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
    this.dataTreeComp.addEvent('uncheck_node.jstree', this.onUnCheckNode.bind(this));
    this.dataTreeComp.addEvent('check_node.jstree', this.onCheckNode.bind(this));
    this.dataTreeComp.addEvent('ready.jstree', this.onReady.bind(this));

    /**
     * We use this observable to update selected tags in dataset.
     * Indeed the onCheckNodeEvent and onUnCheckNodeEvent are triggered before child nodes are actually checked...
     * This solution may not be the best but works.
     * TODO: find a better solution. One would be to not use internal array of checkbox plugin and use ours.
     */
    this.modifiedCheckedNodes.pipe(
      debounceTime(400), // wait for all tags to be checked
      tap(instance => this.addCheckedNodeToDataset(instance))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.modifiedCheckedNodes) {
      this.modifiedCheckedNodes.unsubscribe();
    }
  }

  buildTree(): void {
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
      if (node.original && node.original.tag) {
        const emitItem = {
          clickedTag: node.original.tag, // undefined if none
          selectedTags: data.selected,
        };
        this.selectedTagsE.emit(emitItem);
      }
  }

  private onCheckNode(e, data, event): void {
    const node = data.node;
    if (node.original && node.original.tag) {
      this.dataSet.addTag(node.original.tag.id);
    } else {
      this.modifiedCheckedNodes.next(data.instance);
    }
  }

  private onUnCheckNode(e, data): void {
    const node = data.node;
    if (node.original && node.original.tag) {
      this.dataSet.removeTag(node.original.tag.id);
    } else {
      this.modifiedCheckedNodes.next(data.instance);
    }
  }

  private onReady(e, data): void {
    const checkeds: string[] = data.instance.get_checked();
    checkeds.forEach(idNode => {
      data.instance._open_to(idNode);
    });
  }

  private addCheckedNodeToDataset(instance): void {
    const selectedTags = instance.get_bottom_checked();
    this.dataSet.replaceTags(selectedTags);
  }
}
