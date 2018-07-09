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

  constructor(private ngTreenodeService: NgTreenodeService,
              private messageService: MessageService) {
                super();
                this.selectedNodes = [];
                this.tagsInputForForm = [];
               }

  ngOnInit() {
    this.treeNodes = this.ngTreenodeService.buildOpcTagTree(this.tags);
    this.loading = false;
    this.expandAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tags && !changes.tags.isFirstChange()) {
      this.selectedNodes = [];
      this.treeNodes = this.ngTreenodeService.buildOpcTagTree(this.tags);
      this.loading = false;
      this.expandAll();
    }
  }

  setLoading(): void {
    this.loading = true;
  }

  showRegisterDialog(): void {
    this.tagsInputForForm = this.selectedNodes
      .filter(node => node.type === TypesName.TAG_HISTORIAN || node.type === TypesName.TAG_OPC)
      .map(node => new TagFormInput(node.data));
    this.displayRegister = true;
  }

  showDetailDialog(tag: ITag): void {
    this.tagClicked = tag;
    this.displayTagDetail = true;
  }

  // update tag in tree.
  onTagSaved(tag: IHistorianTag): void {
    this.displayRegister = false;
    const nodeToUpdate: TreeNode = this.selectedNodes.find(n => n.data.id === tag.id);
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

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
