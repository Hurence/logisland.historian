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
    private buildTagTreeNodes(nodes: RestTreeNode[], fields: string[], index: number): TreeNode[] {
        const currentType: string = fields[index];
        const newIndex = index + 1;
        return nodes.map(node => {
            const children: TreeNode[] = this.buildTagTreeNodes(node.children, fields, newIndex);
            return {
                label: node.value,
                data: currentType,
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-folder',
                children: children,
                leaf: false,
                type: currentType,
            };
        });
    }
}
