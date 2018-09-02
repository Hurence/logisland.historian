import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { ArrayUtil } from '../../../../../shared/array-util';
import { QuestionService } from '../../../../../shared/dynamic-form/question.service';
import { TagBrowsingMode } from '../../../../datasource/Datasource';
import { NgTreenodeService } from '../../../service/ng-treenode.service';
import { TagHistorianService } from '../../../service/tag-historian.service';
import { BaseOpcTagTreeComponent } from '../BaseOpcTagTreeComponent';

@Component({
  selector: 'app-opc-tag-tree-manual',
  templateUrl: '../base-opc-tag-tree.component.html',
  styleUrls: ['../base-opc-tag-tree.component.css']
})
export class OpcTagTreeManualComponent extends BaseOpcTagTreeComponent implements OnChanges {

  constructor(protected ngTreenodeService: NgTreenodeService,
              protected tagHistorianService: TagHistorianService,
              protected arrayUtil: ArrayUtil,
              protected questionService: QuestionService) {
                super(ngTreenodeService, questionService);
               }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource && changes.datasource.currentValue) {
      this.treeNodes = [];
      if (this.datasource !== null) {
        this.setLoading();
        switch (this.datasource.tag_browsing) {
          case TagBrowsingMode.MANUAL:
            this.tagHistorianService.getAllFromDatasource(this.datasource.id).subscribe(tags => {
              this.treeNodes = tags.map(tag => this.ngTreenodeService.buildNodeFromTag(tag));
              this.treeNodes.forEach(node => node.label = node.data.node_id);
              if (this.treeNodes.length === 0) {
                this.treeNodes.push(this.ngTreenodeService.getEmptyNode());
              }
              this.loading = false;
            });
            break;
          default:
            console.error('TagBrowsingMode should be MANUAL :', this.datasource.tag_browsing);
            break;
        }
      }
    }
  }

  /**
   *
   * @param node should be a leaf containing a tag
   */
  protected updateNodeAfterDeletingTag(node: TreeNode): void {
    switch (this.datasource.tag_browsing) {
      case TagBrowsingMode.MANUAL:
        if (node.parent) {
          this.arrayUtil.remove(node.parent.children, n => n.data.id === node.data.id);
          if (node.parent.children.length === 0) {
            node.parent.children.push(this.ngTreenodeService.getEmptyNode());
          }
        } else {
          this.arrayUtil.remove(this.treeNodes, n => n.data.id === node.data.id);
          if (this.treeNodes.length === 0) {
            this.treeNodes.push(this.ngTreenodeService.getEmptyNode());
          }
        }
        break;
      default:
      console.error('TagBrowsingMode should be MANUAL :', this.datasource.tag_browsing);
        break;
    }
  }

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    return false;
  }
}
