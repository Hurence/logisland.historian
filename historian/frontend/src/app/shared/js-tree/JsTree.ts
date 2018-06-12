import 'jquery';

import { ElementRef } from '@angular/core';

import { TypesName } from '../../tag/tag-tree/TypesName';
import { INodeTree } from './NodeTree';
import { Observable } from 'rxjs/Observable';

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

    getType(node: string | any): string {
        return this.myTreeJs.get_type(node);
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
        this.createCustomPlugins();

        let treeJQuery: any;
        if (configObject) {
            treeJQuery = ($(this.dataTree.nativeElement) as any).jstree(configObject);
        } else {
            treeJQuery = ($(this.dataTree.nativeElement) as any).jstree();
        }
        this.myTreeJs = ($ as any).jstree.reference(treeJQuery);
    }

    private createCustomPlugins() {
        const JQueryRoot = ($ as any);
        if (!JQueryRoot.jstree.plugins.conditionalselectasync) {
            JQueryRoot.jstree.defaults.conditionalselectasync = function () {
                return false;
            };
             // initializing the custom conditionalselectasync plugin
             JQueryRoot.jstree.plugins.conditionalselectasync = function (options, parent) {
                this.activate_node = function (obj, e) {
                    const canSwitch: Observable<boolean> | boolean = this.settings.conditionalselectasync();
                    if (typeof canSwitch === 'boolean') {
                      if (canSwitch) {
                        parent.activate_node.call(this, obj, e);
                      }
                    } else {
                      canSwitch.subscribe(can => {
                          if (can) {
                            parent.activate_node.call(this, obj, e);
                          }
                      });
                    }
                };
            };
        }
    }
}
