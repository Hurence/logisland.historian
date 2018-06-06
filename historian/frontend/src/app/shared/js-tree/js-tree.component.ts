import 'jquery';

import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { TypesName } from '../../tag/tag-tree/TypesName';
import { INodeTree } from './NodeTree';

declare const $: JQueryStatic;

@Component({
    selector: 'app-js-tree',
    templateUrl: './js-tree.component.html',
    styleUrls: ['./js-tree.component.css']
})
export class JsTreeComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('dataTree') public dataTree: ElementRef;
    @Input() jsonData: INodeTree;
    private myTreeJs: any;
    private _treeJQuery: JQuery<HTMLElement>;

    get treeJQuery(): JQuery<HTMLElement> {
        if (!this._treeJQuery) {
            this._treeJQuery = $(this.dataTree.nativeElement);
        }
        return this._treeJQuery;
    }

    constructor() { }

    ngOnInit() { }

    ngOnDestroy(): void {
        if (this.myTreeJs) this.myTreeJs.destroy(false);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('tree changes : ', changes);
        if (changes.jsonData && changes.jsonData.previousValue !== changes.jsonData.currentValue) {
            this.ngOnDestroy(); // destroy previous tree
            this.createDataTree();
        }
    }
    // : JQuery.EventHandler<TElement> | JQuery.EventHandlerBase<any, JQuery.Event<TElement>> | false
    addEvent(eventName: string, callback: any) {
        this.treeJQuery.on(eventName, callback);
    }

    search(query: string): void {
        if (this.myTreeJs) this.myTreeJs.search(query);
    }

    getNode(obj: any): any {
        if (this.myTreeJs) return this.myTreeJs.get_node(obj);
        else return undefined;
    }

    getBottomSelectedNodes(): any[] {
        if (this.myTreeJs) return this.myTreeJs.get_bottom_selected(true);
        else return [];
    }

    setType(node: string | any, type: string): void {
        if (this.myTreeJs) this.myTreeJs.set_type(node, type);
    }

    private createDataTree() {
        if (this.jsonData) {

            const types = this.getTypes();
             /*
            this.treeJQuery = $(this.dataTree.nativeElement) TODO find a way to have the method available
            without casting to any (so we would have autocompletion if possible)
            */
            const treeJQuery = ($(this.dataTree.nativeElement) as any).jstree({
                core: {
                    multiple: true,
                    animation: 0,
                    check_callback: true,
                    themes: {
                        stripes: true
                    },
                    expand_selected_onload: true,
                    // loaded_state: true,
                    // keyboard allow to associate keyboard touch to a function
                    // keyboard: {
                    //     'enter': () => alert('presserd enter'),
                    //     'p': () => alert('presserd p'),
                    // },
                    data: this.jsonData
                },
                plugins: ['search', 'checkbox', 'types'],
                checkbox: {
                    visible: true,
                    three_state: true,
                    whole_node: false,
                    keep_selected_style: true,
                    tie_selection: true, // an independant array for checkbox when false
                    // cascade_to_hidden: false,
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                    show_only_matches_children: false,
                    close_opened_onclear: true,
                    search_leaves_only: true,
                },
                types: types
            });
            this.myTreeJs = ($ as any).jstree.reference(treeJQuery);
        }
    }

    private getTypes(): any {
        const types =  {};

        types[TypesName.ROOT] = {
            max_depth: 4,
            max_children: -1,
            valid_children: [TypesName.DOMAIN]
        };
        types[TypesName.DOMAIN] = {
            max_depth: 3,
            max_children: -1,
            valid_children: [TypesName.SERVER]
        };
        types[TypesName.SERVER] = {
            max_depth: 2,
            max_children: -1,
            valid_children: [TypesName.GROUP]
        };
        types[TypesName.GROUP] = {
            max_depth: 1,
            max_children: -1,
            valid_children: [TypesName.TAG_HISTORIAN, TypesName.TAG_OPC, TypesName.TAG_IN_DATASET]
        };
        types[TypesName.TAG_HISTORIAN] = {
            icon: 'historian-tag',
            max_depth: 0,
            max_children: 0,
            valid_children: []
        };
        types[TypesName.TAG_OPC] = {
            icon: 'fa fa-file',
            max_depth: 0,
            max_children: 0,
            valid_children: []
        };
        types[TypesName.TAG_IN_DATASET] = {
            icon: 'in-dataset',
            max_depth: 0,
            max_children: 0,
            valid_children: []
        };
        return types;
    }
}
