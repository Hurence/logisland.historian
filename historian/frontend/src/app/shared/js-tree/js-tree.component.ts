import 'jquery';

import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// import $ from 'jquery';
declare const $: JQueryStatic;

@Component({
    selector: 'app-js-tree',
    templateUrl: './js-tree.component.html',
    styleUrls: ['./js-tree.component.css']
})
export class JsTreeComponent implements OnInit, OnDestroy {

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
            this.ngOnDestroy();//destroy previous tree
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
        if (this.myTreeJs) return this.myTreeJs.get_node(obj) 
        else return undefined;
    }

    private createDataTree() {
        if (this.jsonData) {
             /*
            this.treeJQuery = $(this.dataTree.nativeElement) TODO find a way to have the method available
            without casting to any (so we would have autocompletion if possible)
            */
            let treeJQuery = ($(this.dataTree.nativeElement) as any).jstree({
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
                // 'plugins': ['checkbox', 'contextmenu', 'dnd', 'search', 'sort', 'state', 'types', 'unique', 'wholerow']
                // 'plugins': ['dnd', 'search', 'sort', 'types', 'unique', 'wholerow', 'json_data', 'changed']
                checkbox: {
                    visible: true,
                    three_state: true,
                    whole_node: false,
                    keep_selected_style: true,
                    tie_selection: false,//an independant array for checkbox when false
                    // cascade_to_hidden: false,
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                    show_only_matches_children: false,
                    close_opened_onclear: true,
                    search_leaves_only: true,
                },
                types: {
                    '#': {
                        max_depth: 4,
                        max_children: -1, 
                        valid_children: ['domlain']
                    },
                    domlain: {
                        max_depth: 3,
                        max_children: -1,
                        valid_children: ['server']
                    },
                    server: {
                        max_depth: 2,
                        max_children: -1,
                        valid_children: ['group']
                    },
                    group: {
                        max_depth: 1,
                        max_children: -1,
                        valid_children: ['tag']
                    },
                    tag: {
                        icon: 'fa fa-file',
                        max_depth: 0,
                        max_children: 0,
                        valid_children: []
                    },
                },
            });
            this.myTreeJs = ($ as any).jstree.reference(treeJQuery);
        }
    }
}

export interface INodeTree {
    children?: INodeTree[];
    cache?: boolean;
    text?: string;
    state?: IState;
    icon?: string,
    [key: string]: any
  }

export interface IState {
    opened?: boolean;
    checked?: boolean;
    selected?: boolean;
}

export class NodeTree implements INodeTree {

    constructor(options: INodeTree = {}) {
        Object.assign(this, options)
    }

}
