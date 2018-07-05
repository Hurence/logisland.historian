import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { ITag } from '../../modele/tag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { TagService } from '../../service/tag.service';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';

@Component({
  selector: 'app-opc-tag-tree',
  templateUrl: './opc-tag-tree.component.html',
  styleUrls: ['./opc-tag-tree.component.css']
})
export class OpcTagTreeComponent extends BaseTagTreeComponent implements OnInit, OnChanges {


  @Input() tags: ITag[];

  constructor(private ngTreenodeService: NgTreenodeService,
              private tagService: TagService) {
                super();
               }

  ngOnInit() {
    this.selectedNodes = [];
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

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
