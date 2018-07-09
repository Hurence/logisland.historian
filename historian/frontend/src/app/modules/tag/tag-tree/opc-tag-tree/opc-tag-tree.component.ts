import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { ITag } from '../../modele/tag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { TagService } from '../../service/tag.service';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';
import { OpcTag } from '../../modele/OpcTag';
import { ITagFormInput, TagFormInput } from '../../tag-form/TagFormInput';
import { TypesName } from '../TypesName';
import { IHistorianTag } from '../../modele/HistorianTag';

@Component({
  selector: 'app-opc-tag-tree',
  templateUrl: './opc-tag-tree.component.html',
  styleUrls: ['./opc-tag-tree.component.css']
})
export class OpcTagTreeComponent extends BaseTagTreeComponent implements OnInit, OnChanges {


  @Input() tags: ITag[];
  tagSelected: ITag;
  displayRegister = false;
  displayTagDetail = false;
  tagsInputForForm: ITagFormInput[] = [];

  constructor(private ngTreenodeService: NgTreenodeService,
              private tagService: TagService) {
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
    this.tagSelected = tag;
    this.displayTagDetail = true;
  }

  // update tag in tree.
  onTagSaved(tag: IHistorianTag): void {
    // const nodeToUpdate = this.tagTreeComp.jsTree.getNode(tag.id);
    // Object.assign(nodeToUpdate.original.tag, tag);
    // const currentType = this.tagTreeComp.jsTree.getType(nodeToUpdate);
    // if (currentType === TypesName.TAG_OPC) {
    //   this.tagTreeComp.jsTree.setType(nodeToUpdate, TypesName.TAG_HISTORIAN);
    // }
    // this.selectedTags = this.selectedTags.map(tagInput => {
    //   if (tagInput.tag.id === tag.id) {
    //     tagInput.isCreation = false;
    //     return tagInput;
    //   } else {
    //     return tagInput;
    //   }
    // });
  }

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
