import { Injectable, EventEmitter, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag, ITag } from '../modele/tag';
import { debug } from 'util';
import { Options } from 'selenium-webdriver/firefox';
import { TagTreeComponent } from './tag-tree.component';
import { INodeTree, NodeTree, IState } from '../../shared/js-tree/js-tree.component';
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
  buildTree(tags$: Observable<ITag[]>, comp: TagTreeComponent): Observable<INodeTree> {
    return tags$.pipe(      
      map(tags => this.groupBy(tags, comp))
    );
  }

  private groupBy(tags: ITag[], comp: TagTreeComponent): INodeTree {
    let opened = false;
    if (comp.dataSet.getDatasourceIds().size === 1) {
      opened = true;
    }
    const selected = false;

    const treeTag =  tags.reduce(
      (r, v, i, a) => {
        const domain = this.getOrCreateChildren(r, v['domain'],  { opened: opened });
        const server = this.getOrCreateChildren(domain, v['server'],  { opened: opened });
        const group = this.getOrCreateChildren(server, v['group'],  { opened: false });

        let checked = false;
        if (comp.dataSet.containTag(v.id)) {
          checked = true;
        }

        const children = new NodeTree({
          type: 'tag',
          id: v.id,
          text: v.tag_name,
          // icon: "fa fa-file",
          state: {
            opened: opened,
            selected: selected,
            checked: checked,
          },
          children: [],
          tag: v,
          comp: comp,
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
        comp: comp,
      })
    );
    return treeTag;
  }
 

  private getOrCreateChildren(obj: INodeTree, value: string, state?: IState): INodeTree {
    const found = obj.children.find(node => node.text === value)
    if (found) return found;
    const node = new NodeTree({
      id: value,
      text: value, 
      // icon: "fa fa-file",
      state: state,
      children: []
    });
    obj.children.push(node)  
    return node;    
  }
}
