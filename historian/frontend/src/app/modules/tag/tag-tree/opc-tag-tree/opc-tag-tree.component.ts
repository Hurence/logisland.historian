import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { IHistorianTag, HistorianTag } from '../../modele/HistorianTag';
import { ITag, Tag } from '../../modele/tag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { ITagFormInput, TagFormInput } from '../../tag-form/TagFormInput';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';
import { TypesName } from '../TypesName';
import { MessageService } from 'primeng/components/common/messageservice';
import { TagHistorianService } from '../../service/tag-historian.service';
import { TagUtils } from '../../modele/TagUtils';
import { OpcTag } from '../../modele/OpcTag';

@Component({
  selector: 'app-opc-tag-tree',
  templateUrl: './opc-tag-tree.component.html',
  styleUrls: ['./opc-tag-tree.component.css']
})
export class OpcTagTreeComponent extends BaseTagTreeComponent implements OnInit, OnChanges {


  @Input() tags: ITag[];
  // tag detail props
  tagClicked: ITag;
  displayTagDetail = false;
  // tag form dialog props
  displayRegister = false;
  tagsInputForForm: ITagFormInput[] = [];
  // memory to update tree
  nodeForRegister: TreeNode;

  constructor(private ngTreenodeService: NgTreenodeService,
              private messageService: MessageService,
              private tagHistorianService: TagHistorianService) {
                super();
                this.tagsInputForForm = [];
               }

  ngOnInit() {
    this.treeNodes = this.ngTreenodeService.buildOpcTagTree(this.tags);
    this.loading = false;
    this.expandAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tags && !changes.tags.isFirstChange()) {
      this.treeNodes = this.ngTreenodeService.buildOpcTagTree(this.tags);
      this.loading = false;
      this.expandAll();
    }
  }

  setLoading(): void {
    this.loading = true;
  }

  private showRegisterDialog(tags: ITag[]): void {
    this.tagsInputForForm = tags.map(tag => new TagFormInput(tag));
    this.displayRegister = true;
  }

  showRegisterDialogRecursive(node: TreeNode): void {
    this.nodeForRegister = node;
    this.showRegisterDialog(this.getTagsFromNode(node));
  }

  private getTagsFromNode(node: TreeNode): ITag[] {
    if (node.type === TypesName.TAG_HISTORIAN || node.type === TypesName.TAG_OPC) {
      return [node.data];
    } else {
      return node.children.map(n => this.getTagsFromNode(n))
        .reduce((acc, x) => acc.concat(x), []);
    }
  }

  private getNodesFromNode(node: TreeNode, typeNodeToKeep: string[]): TreeNode[] {
    if (typeNodeToKeep.includes(node.type)) {
      return [node];
    } else {
      return node.children.map(n => this.getNodesFromNode(n, typeNodeToKeep))
        .reduce((acc, x) => acc.concat(x), []);
    }
  }

  showDetailDialog(tag: ITag): void {
    this.tagClicked = tag;
    this.displayTagDetail = true;
  }

  deleteTags(node: TreeNode): void {
    const tagNodes = this.getNodesFromNode(node, [TypesName.TAG_HISTORIAN]);
    const tagsToDelete: string[] = tagNodes.map(tagNode => (<IHistorianTag>tagNode.data).id);
    this.tagHistorianService.deleteMany(tagsToDelete).subscribe(deletedTags => {
      tagNodes.forEach(n => this.updateNodeAfterDeletingTag(n));
    });
  }

  deleteTag(node: TreeNode): void {
    this.tagHistorianService.delete(node.data.id).subscribe(deletedTag => this.updateNodeAfterDeletingTag(node));
  }

  private updateNodeAfterDeletingTag(node: TreeNode): void {
    if (node.type === TypesName.TAG_HISTORIAN) {
      (<IHistorianTag>node.data).update_rate = null;
      (<IHistorianTag>node.data).enabled = false;
      const opcTag = new OpcTag(node.data);
      node.data = opcTag;
      node.type = TypesName.TAG_OPC;
      node.icon = node.type;
    }
  }

  toggleEnableds(node: TreeNode): void {
    const enabledRootNode = node.data;
    this.applyToNodeOfTag(node,
      this.forceToggleEnabled.bind(this, enabledRootNode),
      this.conditionToggle.bind(this, enabledRootNode));
  }

  private conditionToggle(enable: boolean, tag: Tag): boolean {
    if (tag.enabled === enable) {
      return false;
    } else {
      return true;
    }
  }

  private forceToggleEnabled(enabled: boolean, node: TreeNode): void {
    node.data.enabled = enabled;
    this.tagHistorianService.createOrReplace(new HistorianTag(node.data)).subscribe(t => {
      this.updateNodeAfteSavingTag(node, t);
    });
  }

  toggleEnabled(node: TreeNode): void {
    this.tagHistorianService.createOrReplace(new HistorianTag(node.data)).subscribe(t => {
      this.updateNodeAfteSavingTag(node, t);
    });
  }

  onTagSaved(tag: IHistorianTag): void {
    this.displayRegister = false;
    const nodeToUpdate: TreeNode = this.findNodeOfTag(this.nodeForRegister, tag);
    if (nodeToUpdate === undefined) {
        this.messageService.add({
        severity: 'error',
        summary: 'Could not find node to update in tree, please refresh the page to have accurate data',
        detail: `Tag id was '${tag.id}'`,
      });
    } else {
      this.updateNodeAfteSavingTag(nodeToUpdate, tag);
    }
  }

  private updateNodeAfteSavingTag(node: TreeNode, tag: HistorianTag): void {
    Object.assign(node.data, tag);
    if (node.type === TypesName.TAG_OPC) {
      node.data = new HistorianTag(node.data);
      node.type = TypesName.TAG_HISTORIAN;
      node.icon = node.type;
    }
  }
/**
 * return node of tag or undefined if not found
 */
  private findNodeOfTag(node: TreeNode, tag: IHistorianTag): TreeNode {
    if (node === undefined) return undefined;
    switch (node.type) {
      case TypesName.TAG_HISTORIAN:
      case TypesName.TAG_OPC:
       if (node.data.id === tag.id) return node;
       break;
      case TypesName.GROUP:
        return this.nodeForRegister.children.find(n => n.data.id === tag.id);
      case TypesName.SERVER:
        this.nodeForRegister.children.forEach(n => {
          const found = this.findNodeOfTag(n, tag);
          if (found) return found;
        });
        break;
      case TypesName.DOMAIN:
        this.nodeForRegister.children.forEach(n => {
          const found = this.findNodeOfTag(n, tag);
          if (found) return found;
        });
        break;
    }
    return undefined;
  }

  /**
 * return node of tag or undefined if not found
 */
private applyToNodeOfTag(node: TreeNode, method: (TreeNode: TreeNode) => void,
                        conditionOnTag: (tag: Tag) => boolean): void {
  if (node === undefined) return undefined;
  switch (node.type) {
    case TypesName.TAG_HISTORIAN:
    case TypesName.TAG_OPC:
      if (conditionOnTag(node.data)) method(node);
     break;
    default: {
      node.children.forEach(n => this.applyToNodeOfTag(n, method, conditionOnTag));
    }
  }
}

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
