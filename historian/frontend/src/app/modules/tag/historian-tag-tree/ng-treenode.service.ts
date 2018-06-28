import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { TagHistorianService } from '../service/tag-historian.service';
import { map } from 'rxjs/operators';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';

@Injectable()
export class NgTreenodeService {

  constructor(private tagService: TagHistorianService) { }


//   {
//     "label": "Pictures",
//     "data": "Pictures Folder",
//     "expandedIcon": "fa fa-folder-open",
//     "collapsedIcon": "fa fa-folder",
//     "children": [
//         {"label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo"},
//         {"label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo"},
//         {"label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo"}]
// },


    getHistTagTree(): Observable<TreeNode[]> {
        return this.tagService.getTreeTag().pipe(
            map(nodes => {return this.buildTagTreeNodes(nodes, ["domain", "server", "group"], 0)})
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
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder",
                children: children,
                leaf: false,
                type: currentType,
            };
        });
    }

    // private buildTagTreeNodes(nodes: RestTreeNode[], fields: string[]): TreeNode[] {
    //     const type: string = fields.shift();
    //     return nodes.map(node => {
    //         return this.buildTagTreeNode(node, type, fields)
    //     });
    // }

    // private buildTagTreeNode(node: RestTreeNode, type: string, fields: string[]): TreeNode {
    //     const nextType = fields.shift();
    //     const children: TreeNode[] = node.children.map(node => this.buildTagTreeNode(node, nextType, fields));                
    //     return {
    //         label: node.value,
    //         // data: "Work Folder",
    //         expandedIcon: "fa fa-folder-open",
    //         collapsedIcon: "fa fa-folder",
    //         children: children,
    //         leaf: true,
    //         type: type,
    //     };
    // }
}
