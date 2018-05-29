import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag } from '../tag';
import { debug } from 'util';
import { Options } from 'selenium-webdriver/firefox';


/**
 * Create a tree for type M. Using nested map to simulate the tree.
 * 
 * TODO: build a generic class. Hard coded type of Map to gain time.
 */
@Injectable()
export class TreeTagService {

  state = { "opened": true, "selected": false }

  constructor() {}
  /**
   * Group tags by domain, server and group.
   * Then add them in tree.
   * @param tags 
   */
  buildTree(tags$: Observable<Tag[]>): Observable<any> {  
    return tags$.pipe(      
      map(tags => this.groupBy(tags))
    );
  }

  private groupBy(tags: Tag[]): any {    
    const treeTag =  tags.reduce(
      (r, v, i, a) => {      
        const domain = this.getOrCreateChildren(r, v['domain']);
        const server = this.getOrCreateChildren(domain, v['server']);
        const group = this.getOrCreateChildren(server, v['group']);
        const children = new NodeTree({
          text: v.id,
          icon: "fa fa-file",
          state: this.state,
          children: []
        });    
        group.children.push(children);        
        return r;
      },
      new NodeTree({
        cache: true,
        text: 'Tags',       
        state: {
          opened: true
        },
        children: []
      })
    );    
    return treeTag;
  }
 

  private getOrCreateChildren(obj: NodeTree, value: string): NodeTree {
    const found = obj.children.find(node => node.text === value)
    if (found) return found;
    const node = new NodeTree({
      text: value, 
      icon: "fa fa-file", 
      state: this.state,
      children: []
    });
    obj.children.push(node)  
    return node;    
  }
}

export interface NodeTree {
  children: NodeTree[];
  cache: boolean;
  text: string;
  state: any;
  icon: "fa fa-file", 
}

export class NodeTree {

  constructor(options : {
    children?: NodeTree[];
    cache?: boolean;
    text?: string;
    state?: any;
    icon?: string, 
  } = {}) {
    Object.assign(this, options)
  }

}