import { TreeNode } from 'primeng/api';

export abstract class BaseTagTreeComponent {

  loading = false;
  treeNodes: TreeNode[];
  selectedNodes: TreeNode[];

  expandAll() {
    this.treeNodes.forEach(node => {
        this.expandRecursive(node, true, true);
    } );
  }

  collapseAll() {
    this.treeNodes.forEach(node => {
        this.expandRecursive(node, false, false);
    } );
  }

  protected expandRecursive(node: TreeNode, isExpand: boolean, loadChildren: boolean) {
    node.expanded = isExpand;
    if (loadChildren) this.loadANodeIfNeeded(node);
    if (node.children) {
        node.children.forEach(childNode => {
            this.expandRecursive(childNode, isExpand, loadChildren);
        } );
    }
  }

  protected abstract loadANodeIfNeeded(node: TreeNode): boolean;
}
