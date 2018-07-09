import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { IHistorianTag } from '../../modele/HistorianTag';
import { ITag } from '../../modele/tag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { ITagFormInput, TagFormInput } from '../../tag-form/TagFormInput';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';
import { TypesName } from '../TypesName';
import { MessageService } from 'primeng/components/common/messageservice';

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
              private messageService: MessageService) {
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

  showRegisterDialog(tags: ITag[]): void {
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
      return node.children.map(node => this.getTagsFromNode(node))
        .reduce((acc, x) => acc.concat(x), []);
    }
  }

  showDetailDialog(tag: ITag): void {
    this.tagClicked = tag;
    this.displayTagDetail = true;
  }

  onTagSaved(tag: IHistorianTag): void {
    this.displayRegister = false;
    const nodeToUpdate: TreeNode = this.findNodeOfTag(this.nodeForRegister, tag);
    if (nodeToUpdate === undefined) {
        this.messageService.add({
        severity: 'error',
        summary: 'Could not find node to update in tree, please refresh the page to have accurate data',
        detail: `Tag id was '${tag.id}'`,
      })
    } else {
      Object.assign(nodeToUpdate.data, tag);
      if (nodeToUpdate.type === TypesName.TAG_OPC) {
        nodeToUpdate.type = TypesName.TAG_HISTORIAN;
        nodeToUpdate.icon = nodeToUpdate.type;
      }
    }
  }
/**
 * return node of tag or undefined if not found
 */
  private findNodeOfTag(node: TreeNode, tag: IHistorianTag): TreeNode {
    switch(node.type) {
      case TypesName.TAG_HISTORIAN || node.type === TypesName.TAG_OPC:
       if (node.data.id === tag.id) return node;
       return undefined;
      break;
      case 'group': return this.nodeForRegister.children.find(n => n.data.id === tag.id)
      case 'server': this.nodeForRegister.children.forEach(n => {
        const found = this.findNodeOfTag(n, tag);
        if (found) return found;
      })
      return undefined;
      case 'domain': this.nodeForRegister.children.forEach(n => {
        const found = this.findNodeOfTag(n, tag);
        if (found) return found;
      })
      return undefined;
    }
  }

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
