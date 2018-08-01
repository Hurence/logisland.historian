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
import { Datasource, TagBrowsingMode } from '../../../datasource/Datasource';
import { TagOpcService } from '../../service/tag-opc.service';

@Component({
  selector: 'app-opc-tag-tree',
  templateUrl: './opc-tag-tree.component.html',
  styleUrls: ['./opc-tag-tree.component.css']
})
export class OpcTagTreeComponent extends BaseTagTreeComponent implements OnInit, OnChanges {


  @Input() datasource: Datasource;
  // tag detail props
  tagClicked: ITag;
  displayTagDetail = false;
  // tag form dialog props
  displayRegister = false;
  tagsInputForForm: ITagFormInput[] = [];
  tagFormTitle: string;
  // memory to update tree
  nodeForRegister: TreeNode;

  constructor(private ngTreenodeService: NgTreenodeService,
              private messageService: MessageService,
              private tagOpcService: TagOpcService,
              private tagHistorianService: TagHistorianService) {
                super();
                this.tagsInputForForm = [];
               }

  ngOnInit() {
    this.loading = false;
    this.updateTagFormTitle();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource && !changes.datasource.isFirstChange()) {
      this.treeNodes = [];
      this.setLoading();
      switch (this.datasource.tag_browsing) {
        case TagBrowsingMode.AUTOMATIC:
          this.tagOpcService.browseTags(this.datasource.id, { nodeId: this.datasource.findRootNodeId(), depth: 1 }).subscribe(tags => {
            this.treeNodes = tags.map(tag => this.ngTreenodeService.buildNodeFromOpcTag(tag));
          });
          break;
        case TagBrowsingMode.MANUAL:
          this.tagHistorianService.getAllFromDatasource(this.datasource.id).subscribe(tags => {
            this.treeNodes.concat(this.ngTreenodeService.buildOpcTagTree(tags))
          });
          break;
        default:
          console.error('unknown TagBrowsingMode type :', this.datasource.tag_browsing);
          break;
      }
      this.loading = false;
      // this.expandAll();
      this.updateTagFormTitle();
    }
  }

  loadNode(event): void {
    const node: TreeNode = event.node;
    if (node && node.type === TypesName.FOLDER && (!node.children  || node.children.length === 0)) {
      this.loading = true;
      this.tagOpcService.browseTags(this.datasource.id, { nodeId: node.data.id , depth: 1 }).subscribe(tags => {
        node.children = tags.map(tag => this.ngTreenodeService.buildNodeFromOpcTag(tag));
        this.loading = false;
      });
    }
  }

  setLoading(): void {
    this.loading = true;
  }

  private showRegisterDialog(tags: Tag[]): void {
    this.tagsInputForForm = tags.map(tag => new TagFormInput(tag));
    this.updateTagFormTitle();
    this.displayRegister = true;
  }
  /**
   *
   * @param node node that will be used when receiving saved tags to modify tags in tree
   *             Can be null, in this case tags will be considered as new tags and will be inserted in root.
   *             See method (onTagSaved)
   */
  showRegisterDialogRecursive(node: TreeNode): void {
    this.nodeForRegister = node;
    this.showRegisterDialog(this.getTagsFromNode(node));
  }

  showRegisterDialogToAddNewTag(tag: HistorianTag): void {
    this.tagsInputForForm = [new TagFormInput(tag)];
    this.updateTagFormTitle();
    this.displayRegister = true;
  }

  private getTagsFromNode(node: TreeNode): Tag[] {
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
      this.updateNodeAfterSavingTag(node, t);
    });
  }

  toggleEnabled(node: TreeNode): void {
    this.tagHistorianService.createOrReplace(new HistorianTag(node.data)).subscribe(t => {
      this.updateNodeAfterSavingTag(node, t);
    });
  }

  /**
   * Update node of the saved tag.
   * Use this.nodeForRegister to improve performance, if this.nodeForRegister is null add a node with this tag
   * as the tag is considered to not be in tree.
   * @param tag saved in form by user
   */
  onTagSaved(tag: HistorianTag): void {
    this.displayRegister = false;
    if (this.nodeForRegister === null) {
      this.addNodeAfterSavingTag(this.treeNodes, tag);
    } else {
      const nodeToUpdate: TreeNode | null = this.findNodeOfTag(this.nodeForRegister, tag);
      if (nodeToUpdate === null) {
          this.messageService.add({
          severity: 'error',
          summary: 'Could not find node to update in tree, please refresh the page to have accurate data',
          detail: `Tag id was '${tag.id}'`,
        });
      } else {
        this.updateNodeAfterSavingTag(nodeToUpdate, tag);
      }
    }
  }

  private addNodeAfterSavingTag(nodes: TreeNode[], tag: HistorianTag): void {
    this.ngTreenodeService.addTagNode(nodes, tag);
  }

  addNodeFromTag(tag: HistorianTag) {
    this.addNodeAfterSavingTag(this.treeNodes, tag);
  }

  private updateNodeAfterSavingTag(node: TreeNode, tag: HistorianTag): void {
    Object.assign(node.data, tag);
    if (node.type === TypesName.TAG_OPC) {
      node.data = new HistorianTag(node.data);
      node.type = TypesName.TAG_HISTORIAN;
      node.icon = node.type;
    }
  }
  /**
   * return node of tag or null if not found
   *
   * @param node node to search in
   * @param tag tag we search the corresponding node
   */
  private findNodeOfTag(node: TreeNode, tag: IHistorianTag): TreeNode | null {
    if (node === undefined || node === null) return null;
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
    return null;
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

  private updateTagFormTitle() {
    if (this.tagsInputForForm.length === 1) {
      this.tagFormTitle = 'Save this tag';
    } else if (this.tagsInputForForm.length !== 0) {
      this.tagFormTitle = `Save those ${this.tagsInputForForm.length} tags`;
    } else { // should not happen
      this.tagFormTitle = 'No Tag Selected !';
    }
  }
}
