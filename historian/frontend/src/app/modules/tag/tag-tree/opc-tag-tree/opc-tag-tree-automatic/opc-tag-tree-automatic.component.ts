import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { QuestionService } from '../../../../../shared/dynamic-form/question.service';
import { TagBrowsingMode } from '../../../../datasource/Datasource';
import { NgTreenodeService } from '../../../service/ng-treenode.service';
import { TagHistorianService } from '../../../service/tag-historian.service';
import { TagOpcService } from '../../../service/tag-opc.service';
import { TypesName } from '../../TypesName';
import { BaseOpcTagTreeComponent } from '../BaseOpcTagTreeComponent';
import { IHistorianTag } from '../../../modele/HistorianTag';
import { OpcTag } from '../../../modele/OpcTag';

@Component({
  selector: 'app-opc-tag-tree-automatic',
  templateUrl: '../base-opc-tag-tree.component.html',
  styleUrls: ['../base-opc-tag-tree.component.css']
})
export class OpcTagTreeAutomaticComponent extends BaseOpcTagTreeComponent implements OnChanges {

  constructor(protected ngTreenodeService: NgTreenodeService,
              protected tagOpcService: TagOpcService,
              protected tagHistorianService: TagHistorianService,
              protected questionService: QuestionService) {
                super(ngTreenodeService, questionService);
               }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource && changes.datasource.currentValue) {
      this.treeNodes = [];
      if (this.datasource !== null) {
        this.setLoading();
        switch (this.datasource.tag_browsing) {
          case TagBrowsingMode.AUTOMATIC:
            this.tagOpcService.browseTags(
              this.datasource.id,
              { nodeId: this.datasource.findRootNodeId(), depth: 1 }
            ).subscribe(tags => {
              this.treeNodes = tags.map(tag => this.ngTreenodeService.buildNodeFromTag(tag));
              this.updateAlreadyRegistredTags(this.treeNodes);
              this.loading = false;
            });
            break;
          default:
            console.error('TagBrowsingMode should be AUTOMATIC :', this.datasource.tag_browsing);
            break;
        }
      }
    }
  }

  /**
   * For every tag node, look if it is already registred.
   * If yes, then we fill tag with correponding data
   * If not, do nothing.
   */
  private updateAlreadyRegistredTags(nodes: TreeNode[]): void {
    nodes.forEach(n => {
      if (n.type === TypesName.TAG_OPC) {
        this.tagHistorianService.getByNodeIdAndDatasourceId(n.data.node_id, n.data.datasource_id).subscribe(
          tags => {
            switch (tags.length) {
              case 1:
                this.updateNodeWithHistorianTag(n, tags[0]);
                break;
              case 0:
              default:
                break;
            }
          },
          error => { }
        );
      }
    });
  }

  loadNode(event): void {
    const node: TreeNode = event.node;
    this.loadANodeIfNeeded(node);
  }

  protected loadANodeIfNeeded(node: TreeNode): boolean {
    if (node && node.type === TypesName.FOLDER && (!node.children  || node.children.length === 0)) {
      this.loading = true;
      this.tagOpcService.browseTags(this.datasource.id, { nodeId: node.data.node_id , depth: 1 }).subscribe(tags => {
        const children = tags.map(tag => this.ngTreenodeService.buildNodeFromTag(tag));
        this.updateAlreadyRegistredTags(children);
        if (children.length === 0) {
          node.children = [this.ngTreenodeService.getEmptyNode()];
        } else {
          node.children = children;
        }
        this.loading = false;
      });
      return true;
    }
    return false;
  }

     /**
   *
   * @param node should be a leaf containing a tag
   */
  protected updateNodeAfterDeletingTag(node: TreeNode): void {
    (<IHistorianTag>node.data).update_rate = null;
    (<IHistorianTag>node.data).enabled = false;
    const opcTag = new OpcTag(node.data);
    node.data = opcTag;
    node.type = TypesName.TAG_OPC;
    node.icon = node.type;
  }
}
