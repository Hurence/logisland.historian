import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dataset } from '../../dataset/dataset';
import { INodeTree, IState, NodeTree } from '../../shared/js-tree/NodeTree';
import { ITag, Tag } from '../modele/tag';

declare const $: JQueryStatic;

/**
 * Create a tree for type M. Using nested map to simulate the tree.
 *
 * TODO: build a generic class. Hard coded type of Map to gain time.
 */
@Injectable()
export class TreeTagService {

  constructor() {}
  /**
   * Group tags by domain, server and group.
   * Then add them in tree.
   * @param tags
   */
  buildTree(tags$: Observable<ITag[]>, dataSet: Dataset): Observable<INodeTree> {
    return tags$.pipe(
      map(tags => this.groupBy(tags, dataSet))
    );
  }

  private groupBy(tags: ITag[], dataSet: Dataset): INodeTree {
    let opened = false;
    if (dataSet.getDatasourceIds().size === 1) {
      opened = true;
    }

    const treeTag =  tags.reduce(
      (r, v, i, a) => {
        const domain = this.getOrCreateChildren(r, v['domain'],  { opened: opened });
        const server = this.getOrCreateChildren(domain, v['server'],  { opened: opened });
        const group = this.getOrCreateChildren(server, v['group'],  { opened: false });

        let selected = false;
        if (dataSet.containTag(v.id)) {
          selected = true;
        }

        const nodeType = Tag.getType(v);
        const children = new NodeTree({
          type: nodeType,
          id: v.id,
          text: v.tag_name,
          // icon: "fa fa-file",
          state: {
            opened: opened,
            selected: selected,
          },
          children: [],
          tag: v,
        });
        group.children.push(children);
        return r;
      },
      new NodeTree({
        type: '#',
        cache: true,
        text: 'Tags',
        state: {
          opened: true,
        },
        children: [],
      })
    );
    return treeTag;
  }

  private getOrCreateChildren(obj: INodeTree, value: string, state?: IState): INodeTree {
    const found = obj.children.find(n => n.text === value);
    if (found) return found;
    const node = new NodeTree({
      id: value,
      text: value,
      // icon: "fa fa-file",
      state: state,
      children: []
    });
    obj.children.push(node);
    return node;
  }
}
