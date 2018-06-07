import 'jquery';

import { ElementRef } from '@angular/core';

import { TypesName } from '../../tag/tag-tree/TypesName';
import { INodeTree } from './NodeTree';

declare const $: JQueryStatic;

export class JsTree {

    private myTreeJs: any;
    private _treeJQuery: JQuery<HTMLElement>;

    constructor(public dataTree: ElementRef,
                configObject: any) {
        this.createDataTree(configObject);
    }

    get treeJQuery(): JQuery<HTMLElement> {
        if (!this._treeJQuery) {
            this._treeJQuery = $(this.dataTree.nativeElement);
        }
        return this._treeJQuery;
    }

    destroy(): void {
        this.myTreeJs.destroy(false);
    }
    
    // : JQuery.EventHandler<TElement> | JQuery.EventHandlerBase<any, JQuery.Event<TElement>> | false
    addEvent(eventName: string, callback: any) {
        this.treeJQuery.on(eventName, callback);
    }

    search(query: string): void {
        this.myTreeJs.search(query);
    }

    getNode(obj: any): any {
        return this.myTreeJs.get_node(obj);    
    }

    getBottomSelectedNodes(): any[] {
        return this.myTreeJs.get_bottom_selected(true);        
    }

    setType(node: string | any, type: string): void {
        this.myTreeJs.set_type(node, type);
    }

    deleteNode(node: any): void {
        this.myTreeJs.delete_node(node);
    }

    createNode(parent: any, node: any): void {
        this.myTreeJs.create_node(parent, node);
    }

    private createDataTree(configObject: any) {    
        /*
       this.treeJQuery = $(this.dataTree.nativeElement) TODO find a way to have the method available
       without casting to any (so we would have autocompletion if possible)
       */
        let treeJQuery: any;
        if (configObject) {
            treeJQuery = ($(this.dataTree.nativeElement) as any).jstree(configObject);
        } else {
            treeJQuery = ($(this.dataTree.nativeElement) as any).jstree();
        }
        this.myTreeJs = ($ as any).jstree.reference(treeJQuery);
    }
}
