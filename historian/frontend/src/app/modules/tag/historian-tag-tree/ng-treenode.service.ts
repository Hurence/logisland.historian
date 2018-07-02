import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { TagHistorianService } from '../service/tag-historian.service';
import { map } from 'rxjs/operators';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';

@Injectable()
export class NgTreenodeService {

  constructor(private tagService: TagHistorianService) { }

    getHistTagTree(): Observable<TreeNode[]> {
        return this.tagService.getTreeTag().pipe(
            map(nodes => this.buildTagTreeNodes(nodes, ['domain', 'server', 'group'], 0))
        );
    }
    // TODO implement generic version of this
    private buildTagTreeNodes(nodes: RestTreeNode[], fields: string[], index: number, parent?: TreeNode): TreeNode[] {
        const currentType: string = fields[index];
        const newIndex = index + 1;
        return nodes.map(node => {
            const currentNode: TreeNode = {
                label: node.value,
                data: currentType,
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-folder',
                leaf: false,
                type: currentType,
            };
            const children: TreeNode[] = this.buildTagTreeNodes(node.children, fields, newIndex, currentNode);
            currentNode.children = children;
            if (parent) currentNode.parent = parent;
            return currentNode;
        });
    }
}
