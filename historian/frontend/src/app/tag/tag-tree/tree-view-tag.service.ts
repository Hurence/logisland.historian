import { Injectable, EventEmitter, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag, ITag } from '../modele/tag';
import { debug } from 'util';
import { Options } from 'selenium-webdriver/firefox';
import { TagTreeComponent } from './tag-tree.component';
import { INodeTree, NodeTree } from '../../shared/js-tree/js-tree.component';
import { Dataset } from '../../dataset/dataset';
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
        const domain = this.getOrCreateChildren(r, v['domain'], opened);
        const server = this.getOrCreateChildren(domain, v['server'], opened);
        const group = this.getOrCreateChildren(server, v['group'], false);


        let selected = false;
        let checked = false;
        if (dataSet.containTag(v.id)) {
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
 

  private getOrCreateChildren(obj: INodeTree, value: string, opened: boolean): INodeTree {
    const found = obj.children.find(node => node.text === value)
    if (found) return found;
    const node = new NodeTree({
      id: value,
      text: value, 
      // icon: "fa fa-file",
      state: { opened: opened },
      children: []
    });
    obj.children.push(node)  
    return node;    
  }
}
