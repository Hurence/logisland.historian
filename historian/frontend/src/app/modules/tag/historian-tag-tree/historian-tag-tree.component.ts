import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TagsSelection } from '../../selection/Selection';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagHistorianService } from '../service/tag-historian.service';
import { NgTreenodeService } from './ng-treenode.service';

@Component({
  selector: 'app-historian-tag-tree',
  templateUrl: './historian-tag-tree.component.html',
  styleUrls: ['./historian-tag-tree.component.css']
})
export class HistorianTagTreeComponent implements OnInit, OnChanges {

  @Input() tagsSelection: TagsSelection;

  loading = false;
  treeNodes: TreeNode[];
  selectedNodes: TreeNode[];

  constructor(private ngTreenodeService: NgTreenodeService,
              private tagService: TagHistorianService) { }

  ngOnInit() {
    this.selectedNodes = [];
    this.getNodeTree().subscribe(treeNodes => {
      this.treeNodes = treeNodes;
      this.expandAll();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tagsSelection && !changes.tagsSelection.isFirstChange()) {
      this.selectedNodes.forEach(node => {
        this.selectRecursive(node, false);
      });
      this.selectedNodes = [];
      this.treeNodes.forEach(node => {
        this.selectTagNodes(node);
      });
    }
  }

  nodeSelect(event) {
    this.loadANode(event.node);
    this.selectNode(event.node);
  }

  nodeUnSelect(event) {
    this.selectRecursive(event.node, false);
  }

  saveSelection() {

  }

  revertSelection() {

  }

  expandAll() {
    this.treeNodes.forEach( node => {
        this.expandRecursive(node, true);
    } );
  }

  collapseAll() {
    this.treeNodes.forEach( node => {
        this.expandRecursive(node, false);
    } );
  }

  loadNode(event) {
    this.loadANode(event.node);
  }

  private getNodeTree(): Observable<TreeNode[]> {
    return this.ngTreenodeService.getHistTagTree();
  }

  private selectTagNodes(node: TreeNode): void {
    if (node && node.type === 'tag' && this.tagsSelection.containTag(node.data.id)) {
        node.icon = this.findIcon(true);
        this.selectedNodes.push(node);
    }
    if (node.children) {
        node.children.forEach( childNode => {
            this.selectTagNodes(childNode);
        } );
    }
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    this.loadANode(node);
    if (node.children) {
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
  }

  private selectNode(node: TreeNode): void {
    console.log('select node', node);
    this.selectRecursive(node, true);
  }

  private selectRecursive(node: TreeNode, isSelected: boolean) {
    if (node.type === 'tag') {
      node.icon = this.findIcon(isSelected);
      if (isSelected) {
        this.tagsSelection.addTag(node.data.id);
      } else {
        this.tagsSelection.removeTag(node.data.id);
      }
    }
    if (node.children) {
        node.children.forEach( childNode => {
            this.selectRecursive(childNode, isSelected);
        } );
    }
  }

  private findIcon(isSelected: boolean): string {
    if (isSelected) return 'in-dataset';
    return 'historian-tag';
  }

  private loadANode(node: TreeNode): boolean {
    if (node && node.type === 'group' && (!node.children  || node.children.length === 0)) {
      this.loadChildren(node);
      return true;
    }
    return false;
  }

  private getChildren(node: TreeNode): Observable<TreeNode[]> {
    const query: string = this.buildQuery(node);
    return this.tagService.getQuery(query).pipe(
      map(tags => this.createNodesFromTags(tags))
    );
  }

  private createNodesFromTags(tags: IHistorianTag[]): TreeNode[] {
    const nodes = this.createNodes(tags);
    nodes.forEach(node => {
      const tagId = (node.data as IHistorianTag).id;
      if (this.tagsSelection.containTag(tagId)) {
        this.selectedNodes.push(node);
        this.selectNode(node);
      }
    });
    return nodes;
  }

  private loadChildren(node: TreeNode): void {
    this.loading = true;
    this.getChildren(node).subscribe(nodes => {
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
    const query = `${node.type}:"${node.label}"`;
    if (node.parent) return `${query} AND ${this.buildQuery(node.parent)}`;
    return query;
  }
}
