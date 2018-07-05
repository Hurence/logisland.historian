import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Dataset } from '../../../dataset/dataset';
import { JsTree } from '../../../shared/js-tree/JsTree';
import { IHistorianTag } from '../modele/HistorianTag';
import { ITag, Tag } from '../modele/tag';
import { TagService } from '../service/tag.service';
import { TreeTagService } from './tree-view-tag.service';
import { TypesName } from './TypesName';
import { INodeTree } from '../../../shared/js-tree/NodeTree';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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

  @Input() dataSet: Dataset;
  @Input() canChangeSelection?: () => Observable<boolean> | boolean;
  @Output() selectedTagsE = new EventEmitter<TreeTagSelect>();

  @ViewChild('dataTree') public treeElem: ElementRef;
  public jsTree: JsTree;
  private loadJsonTree: Subscription;
  private DELAY = 400; // delay to wait before requesting tags when refreshing.

  constructor(private tagService: TagService,
              private treeTagService: TreeTagService) {}

  ngOnInit() {
    if (!this.canChangeSelection) {
      this.canChangeSelection = () => false;
    }
    this.initTree();
  }

  ngOnDestroy(): void {
    if (this.loadJsonTree) this.loadJsonTree.unsubscribe();
    if (this.jsTree) this.jsTree.destroy();
  }

  onAddToDataset(): void {
    this.getSelectedHistorianTags().forEach(tag => {
      this.dataSet.addTag(tag.id);
      this.jsTree.setType(tag.id, TypesName.TAG_IN_DATASET);
    });
  }

  onRemoveFromDataset(): void {
    this.getSelectedHistorianTags().forEach(tag => {
      this.dataSet.removeTag(tag.id);
      this.jsTree.setType(tag.id, TypesName.TAG_HISTORIAN);
    });
  }

  refresh(): void {
    if (this.loadJsonTree) this.loadJsonTree.unsubscribe();
    this.loadJsonTree = Observable.of(1).delay(this.DELAY).subscribe(x => {
      this.loadTreeNode().subscribe(tree => {
        this.jsTree.deleteNode('Tags');
        this.jsTree.createNode('#', tree);
      });
    });
  }

  private getSelectedHistorianTags(): IHistorianTag[] {
    const tags: IHistorianTag[] = [];
    this.jsTree.getBottomSelectedNodes().map(node => {
      if (Tag.isHistorianTag(node.original.tag)) {
        tags.push(node.original.tag);
      }
    });
    return tags;
  }

  private initTree(): void {
    this.createTree();
    this.loadJsonTree = this.loadTreeNode().subscribe(tree => {
        this.jsTree.createNode('#', tree);
    });
    this.jsTree.addEvent('changed.jstree', this.onChange.bind(this));
    this.jsTree.addEvent('ready.jstree', this.onReady.bind(this));
    this.jsTree.addEvent('create_node.jstree', this.onCreateNode.bind(this));
  }

  private loadTreeNode(): Observable<INodeTree> {
    const tags$: Observable<ITag[]> = this.tagService.gets(Array.from(this.dataSet.getDatasourceIds()));
    return this.treeTagService.buildTree(tags$, this.dataSet);
  }

  createTree(): void {
    const configObject = {
            core: {
                multiple: true,
                animation: 0,
                check_callback: true,
                themes: {
                    stripes: true
                },
                expand_selected_onload: true,
                // loaded_state: true,
                // keyboard allow to associate keyboard touch to a function
                // keyboard: {
                //     'enter': () => alert('presserd enter'),
                //     'p': () => alert('presserd p'),
                // },
                // data: jsonData
            },
            plugins: ['search', 'checkbox', 'types', 'conditionalselectasync'],
            conditionalselectasync: this.canChangeSelection,
            checkbox: {
                visible: true,
                three_state: true,
                whole_node: false,
                keep_selected_style: true,
                tie_selection: true, // an independant array for checkbox when false
                // cascade_to_hidden: false,
            },
            search: {
                case_sensitive: false,
                show_only_matches: true,
                show_only_matches_children: false,
                close_opened_onclear: true,
                search_leaves_only: true,
            },
            types: this.getTypes()
        };
      this.jsTree = new JsTree(this.treeElem, configObject);
  }

  private getTypes(): any {
    const types =  {};

    types[TypesName.TAGS] = {
        max_depth: 4,
        max_children: -1,
        valid_children: [TypesName.DOMAIN]
    };
    types[TypesName.DOMAIN] = {
        max_depth: 3,
        max_children: -1,
        valid_children: [TypesName.SERVER]
    };
    types[TypesName.SERVER] = {
        max_depth: 2,
        max_children: -1,
        valid_children: [TypesName.GROUP]
    };
    types[TypesName.GROUP] = {
        max_depth: 1,
        max_children: -1,
        valid_children: [TypesName.TAG_HISTORIAN, TypesName.TAG_OPC, TypesName.TAG_IN_DATASET]
    };
    types[TypesName.TAG_HISTORIAN] = {
        icon: 'historian-tag',
        max_depth: 0,
        max_children: 0,
        valid_children: []
    };
    types[TypesName.TAG_OPC] = {
        icon: 'fa fa-file',
        max_depth: 0,
        max_children: 0,
        valid_children: []
    };
    types[TypesName.TAG_IN_DATASET] = {
        icon: 'in-dataset',
        max_depth: 0,
        max_children: 0,
        valid_children: []
    };
    return types;
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
    let clickedTag;
    if (node && node.original && node.original.tag) {
      clickedTag = node.original.tag;
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
    const tagIds: Set<string> = this.dataSet.getTagIds();
    tagIds.forEach(idNode => {
      data.instance._open_to(idNode);
    });
    this.sendSelectedTags(e, data.instance, Array.from(tagIds));
  }
}
