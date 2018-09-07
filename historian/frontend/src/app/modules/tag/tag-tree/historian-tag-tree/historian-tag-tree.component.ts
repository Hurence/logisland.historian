import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ProfilService } from '../../../../profil/profil.service';
import { ArrayUtil } from '../../../../shared/array-util';
import { TagsSelection } from '../../../selection/Selection';
import { SelectionService } from '../../../selection/selection.service';
import { HistorianTag, IHistorianTag } from '../../modele/HistorianTag';
import { NgTreenodeService } from '../../service/ng-treenode.service';
import { TagHistorianService } from '../../service/tag-historian.service';
import { BaseTagTreeComponent } from '../BaseTagTreeComponent';
import { TypesName } from '../TypesName';

@Component({
  selector: 'app-historian-tag-tree',
  templateUrl: './historian-tag-tree.component.html',
  styleUrls: ['./historian-tag-tree.component.css']
})
export class HistorianTagTreeComponent extends BaseTagTreeComponent implements OnInit, OnChanges {

  @Input() selectedTags: HistorianTag[];

  loading = false;
  treeNodes: TreeNode[];
  selectedNodes: TreeNode[];

  constructor(private ngTreenodeService: NgTreenodeService,
              private tagService: TagHistorianService,
              private selectionService: SelectionService,
              private profilService: ProfilService,
              private arrayUtil: ArrayUtil) {
                super();
              }

  ngOnInit() {
    this.selectedNodes = [];
    this.treeNodes = [];
    this.getNodeTree().subscribe(treeNodes => {
      this.treeNodes = treeNodes;
      this.expandAll(true);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedTags && !changes.selectedTags.isFirstChange() && this.selectedTags) {
      this.loadNodeOfTags(this.selectedTags);
      this.selectedNodes.forEach(node => {
        this.restoreNodeTree(node);
      });
      this.selectedNodes = [];
      this.treeNodes.forEach(node => {
        this.initializeTreeWithTags(node, this.selectedTags);
      });
    }
  }

  private loadNodeOfTags(tags: HistorianTag[]) {
    const groupedTags = this.arrayUtil.groupBy(tags, t => t.datasource_id + '##' + t.group);
    for (const key in groupedTags) {
      if (groupedTags.hasOwnProperty(key)) {
        const tagsForThisGroup = groupedTags[key];
        const firstTag: HistorianTag = tagsForThisGroup[0];
        const groupTreeNode: TreeNode = this.findGroupNode(firstTag);
        this.loadANodeIfNeeded(groupTreeNode, true);
        groupTreeNode.expanded = true;
      }
    }
  }

  private findGroupNode(tag: HistorianTag): TreeNode {
    const nodeDatasourceId: TreeNode = this.treeNodes.find(node => node.data.value === tag[node.data.key]);
    if (!nodeDatasourceId) return null;
    return nodeDatasourceId.children.find(node => node.data.value === tag[node.data.key]);
  }

  selectNode(event) {
    this.selectRecursive(event.node, true, true);
  }

  unSelectNode(event) {
    this.selectRecursive(event.node, false, true);
  }

  loadNode(event) {
    this.loadANodeIfNeeded(event.node, false);
  }

  saveSelection() {

  }

  revertSelection() {

  }

  private getNodeTree(): Observable<TreeNode[]> {
    return this.ngTreenodeService.getHistTagTree();
  }

  private initializeTreeWithTags(node: TreeNode, tags: HistorianTag[]): void {
    if (node && node.type === 'tag' && this.arrayUtil.exist(tags, tag => tag.id === node.data.id)) {
        node.icon = this.findIcon(true);
        this.selectedNodes.push(node);
    }
    if (node.children) {
        node.children.forEach( childNode => {
            this.initializeTreeWithTags(childNode, tags);
        } );
    }
  }

  /** Change icon of selected or unselected tags
   * add or remove them from current tagsSelection
   *
   * We do not need to add them in selectedNodes as it is done by defaut using checkbox selection
  */
  private selectRecursive(node: TreeNode, isSelected: boolean, modifySelection: boolean) {
    if (node.type === 'tag') {
      node.icon = this.findIcon(isSelected);
      if (modifySelection) {
        if (isSelected) {
          if (!this.arrayUtil.exist(this.selectedTags, tag => tag.id === node.data.id)) {
            this.selectedTags.push(node.data);
          }
        } else {
          this.arrayUtil.remove(this.selectedTags, tag => tag.id === node.data.id);
        }
      }
    }
    if (node.children) {
        node.children.forEach(childNode => {
            this.selectRecursive(childNode, isSelected, modifySelection);
        } );
    }
  }
  /**
   * restore normal node state (recursively)
   * @param node
   */
  private restoreNodeTree(node: TreeNode) {
    if (node.type === 'tag') {
      node.icon = this.findIcon(false);
    }
    if (node.children) {
        node.children.forEach(childNode => {
            this.restoreNodeTree(childNode);
        } );
    }
  }

  private findIcon(isSelected: boolean): string {
    if (isSelected) return 'in-dataset';
    return 'historian-tag';
  }

  protected loadANodeIfNeeded(node: TreeNode, initialization: boolean): boolean {
    if (node && node.type === TypesName.FOLDER && (!node.children  || node.children.length === 0)) {
      this.loadChildren(node, !initialization);
      return true;
    }
    return false;
  }

  private getChildren(node: TreeNode, modifySelection: boolean): Observable<TreeNode[]> {
    const query: string = this.buildQuery(node);
    return this.tagService.getQuery(query).pipe(
      map(tags => this.createNodesFromTags(tags, modifySelection))
    );
  }

  private createNodesFromTags(tags: IHistorianTag[], modifySelection: boolean): TreeNode[] {
    const nodes = this.createNodes(tags);
    nodes.forEach(node => {
      const tagId = (node.data as IHistorianTag).id;
      if (this.arrayUtil.exist(this.selectedTags, tag => tag.id === tagId)) {
        this.selectedNodes.push(node);
        this.selectRecursive(node, true, modifySelection);
      }
    });
    return nodes;
  }

  private loadChildren(node: TreeNode, modifySelection: boolean): void {
    this.loading = true;
    this.getChildren(node, modifySelection).subscribe(nodes => {
      node.children = nodes;
      this.loading = false;
    });
  }

  private createNodes(tags: IHistorianTag[]): TreeNode[] {
    const children = tags.map(tag => {
      return {
          label: tag.tag_name,
          data: tag,
          icon: 'historian-tag',
          leaf: true,
          type: 'tag',
      };
    });
    return children;
  }

  private buildQuery(node: TreeNode): string {
    const query = `${node.data.key}:"${node.data.value}"`;
    if (node.parent) return `${query} AND ${this.buildQuery(node.parent)}`;
    return query;
  }
}
