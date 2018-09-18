import { EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/components/common/api';

import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { QuestionService } from '../../../../shared/dynamic-form/question.service';
import { IModification, Operation } from '../../../datasource/ConfigurationToApply';
import { Datasource } from '../../../datasource/Datasource';
import { HistorianTag } from '../../modele/HistorianTag';
import { ITag } from '../../modele/tag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';
import { TypesName } from '../TypesName';
import { Dialog } from 'primeng/dialog';

export abstract class BaseOpcTagTreeComponent extends BaseTagTreeComponent implements OnInit {

  @Input() withExpandAll?: boolean = true;
  @Input() withCollapseAll?: boolean = true;
  @Input() treeNodes: TreeNode[];
  @Input() datasourceId: string;
  @Output() modifiedTag = new EventEmitter<IModification<HistorianTag>>();

  displayEdit = false;
  selectedTag: ITag;
  // memory to update tree
  nodeTargeted: TreeNode;
  tagEditQuestions: QuestionBase<any>[];

  @ViewChild(Dialog)
  private editTagDialComp: Dialog;

  constructor(
    protected ngTreenodeService: NgTreenodeService,
    protected questionService: QuestionService) {
      super();
     }

  ngOnInit() {
    this.tagEditQuestions = this.questionService.getTagForm();
    this.loading = false;
  }

  setLoading(): void {
    this.loading = true;
  }

    /**
   *
   * @param node node that will be used when receiving saved tags to modify tags in tree
   *             Can be null, in this case tags will be considered as new tags and will be inserted in root.
   *             See method (onTagSaved)
   */
  showEditDialog(node: TreeNode): void {
    this.nodeTargeted = node;
    this.selectedTag = node.data;
    this.displayEdit = true;
  }

  centerEditTagDialog(): void {
    // bug this popup does not get centered without this... Seems that the reason is of the presence of an *ngIf in parents
    setTimeout(() => { this.editTagDialComp.center(); });
  }


  /**
   * send a delete modificaton
   * @param node sould be a leaf containing a tag
   */
  deleteTag(node: TreeNode): void {
    const tag: HistorianTag = node.data;
    this.modifiedTag.emit({
      operation: Operation.DELETE,
      item: tag
    });
    this.updateNodeAfterDeletingTag(node);
  }

  loadNode(event): void {
    const node: TreeNode = event.node;
    this.loadANodeIfNeeded(node);
  }

  toggleExpandNode(node: TreeNode): void {    
    node.expanded = !node.expanded;
    this.loadANodeIfNeeded(node);    
  }
  /**
   *
   * @param node should be a leaf containing a tag
   */
  protected abstract updateNodeAfterDeletingTag(node: TreeNode): void;

  toggleEnabled(node: TreeNode): void {
    if (node.type === TypesName.TAG_OPC) {
      node.data = new HistorianTag(node.data);
      node.type = TypesName.TAG_HISTORIAN;
      node.icon = node.type;
      this.modifiedTag.emit({
        operation: Operation.CREATE,
        item: node.data
      });
    } else {
      this.modifiedTag.emit({
        operation: Operation.UPDATE,
        item: node.data
      });
    }
  }

     /**
   * Update node of the saved tag.
   * Use this.nodeTargeted to improve performance, if this.nodeTargeted is null add a node with this tag
   * as the tag is considered to not be in tree.
   * @param tag saved in form by user
   */
  onTagModification(modif: IModification<HistorianTag>): void {
    this.modifiedTag.emit(modif);
    this.displayEdit = false;
    switch (modif.operation) {
      case Operation.CREATE:
        this.addNodeFromTag(modif.item);
        break;
      case Operation.UPDATE:
        this.updateNodeWithHistorianTag(this.nodeTargeted, modif.item);
        break;
      case Operation.DELETE:
        this.updateNodeAfterDeletingTag(this.nodeTargeted);
        break;
    }
  }

  addNodeFromTag(tag: HistorianTag) {
    const nodeToAppend = this.ngTreenodeService.buildNodeFromTag(tag);
    if (this.treeNodes.length === 1 && this.treeNodes[0].type === 'none') {
      this.treeNodes.pop();
    }
    this.treeNodes.push(nodeToAppend);
  }

  protected updateNodeWithHistorianTag(node: TreeNode, tag: HistorianTag): void {
    Object.assign(node.data, tag);
    if (node.type === TypesName.TAG_OPC) {
      node.data = new HistorianTag(node.data);
      node.type = TypesName.TAG_HISTORIAN;
      node.icon = node.type;
    }
  }
}
