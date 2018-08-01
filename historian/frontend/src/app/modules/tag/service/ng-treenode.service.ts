import { debug } from 'util';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { TagHistorianService } from './tag-historian.service';
import { map } from 'rxjs/operators';
import { RestTreeNode } from '../../../core/modele/RestTreeNode';
import { ITag, TagRecordType } from '../modele/tag';
import { TypesName } from '../tag-tree/TypesName';
import { HistorianTag } from '../modele/HistorianTag';
import { OpcTag } from '../modele/OpcTag';
// import { NodeTree } from '../../../shared/js-tree/NodeTree';

@Injectable()
export class NgTreenodeService {

  constructor(private tagService: TagHistorianService) { }

  /*

        Tag Tree for configuring tag from opc datasources to retireve data from

    */
    buildOpcTagTree(tags: ITag[]): TreeNode[] {
        return this.buildTagTreeNodes2(tags);
    }

    addTagNode(nodes: TreeNode[], tag: HistorianTag): void {
        const domain = this.getOrCreateChildForNodes(nodes, tag.domain, TypesName.DOMAIN);
        const server = this.getOrCreateChildForNode(domain, tag.server, TypesName.SERVER);
        const group = this.getOrCreateChildForNode(server, tag.group, TypesName.GROUP);
        const child: TreeNode = {
            label: tag.tag_name,
            data: tag,
            icon: TypesName.TAG_HISTORIAN,
            leaf: true,
            type: TypesName.TAG_HISTORIAN,
            children: [],
        };
        group.children.push(child);
    }

    buildNodeFromOpcTag(tag: OpcTag): TreeNode {
        let child: TreeNode;
        switch (tag.record_type) {
            case TagRecordType.TAG:
                child = {
                    label: tag.tag_name,
                    data: tag,
                    icon: TypesName.TAG_OPC,
                    leaf: true,
                    type: TypesName.TAG_OPC,
                    children: [],
                };
                break;
            case TagRecordType.FOLDER:
                child = {
                    label: tag.tag_name,
                    data: tag,
                    icon: TypesName.FOLDER,
                    leaf: false,
                    type: TypesName.FOLDER,
                    children: [],
                };
                break;
        }
        return child;
    }

    private buildTagTreeNodes2(tags: ITag[]): TreeNode[] {
        const treeTag = tags.reduce(
            (prev, cur, i, a) => {
                const domain = this.getOrCreateChildForNodes(prev, cur['domain'], TypesName.DOMAIN);
                const server = this.getOrCreateChildForNode(domain, cur['server'], TypesName.SERVER);
                const group = this.getOrCreateChildForNode(server, cur['group'], TypesName.GROUP);

                const nodeType: string = TypesName.getType(cur);
                const children: TreeNode = {
                    label: cur.tag_name,
                    data: cur,
                    icon: nodeType,
                    leaf: true,
                    type: nodeType,
                    children: [],
                };
                group.children.push(children);
                return prev;
            },
            []
        );
        if (treeTag.length === 0) {
            return [{
                type: 'none',
            }];
        }
        return treeTag;
    }

  private getOrCreateChildForNode(obj: TreeNode, value: string, typeNode: string): TreeNode {
    const found = obj.children.find(n => n.label === value);
    if (found) return found;
    const node: TreeNode = {
        label: value,
        data: false,
        leaf: false,
        type: typeNode,
        children: [],
    };
    obj.children.push(node);
    return node;
  }

  private getOrCreateChildForNodes(children: TreeNode[], value: string, typeNode: string): TreeNode {
    const found = children.find(n => n.label === value);
    if (found) return found;
    const node: TreeNode = {
        label: value,
        data: false,
        leaf: false,
        type: typeNode,
        children: [],
    };
    children.push(node);
    return node;
  }

    /*

        Tag Tree for selecting tags to draw

    */
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
