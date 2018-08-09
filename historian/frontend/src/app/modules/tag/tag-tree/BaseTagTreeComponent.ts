import { TreeNode } from 'primeng/api';

export abstract class BaseTagTreeComponent {

  loading = false;
  treeNodes: TreeNode[];
  selectedNodes: TreeNode[];

  expandAll(loadChildren?: boolean) {
    this.treeNodes.forEach(node => {
        this.expandRecursive(node, true, loadChildren || false);
    } );
  }

  collapseAll() {
    this.treeNodes.forEach(node => {
        this.expandRecursive(node, false, false);
    } );
  }

  protected expandRecursive(node: TreeNode, isExpand: boolean, loadChildren: boolean) {
    if (loadChildren) this.loadANodeIfNeeded(node);
    if (node.children && node.children.length !== 0) {
        node.expanded = isExpand;
        node.children.forEach(childNode => {
            this.expandRecursive(childNode, isExpand, loadChildren);
        } );
    }
  }

  protected abstract loadANodeIfNeeded(node: TreeNode): boolean;
}
