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
    @Input() jsonData: any;
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
                        multiple: false,
                        animation: 0,
                        check_callback: true,
                        themes: {
                            stripes: true
                        },
                        expand_selected_onload: true,
                        // keyboard allow to associate keyboard touch to a function
                        // keyboard: {
                        //     'enter': () => alert('presserd enter'),
                        //     'p': () => alert('presserd p'),
                        // },
                        data: this.jsonData
                    },
                    plugins: ['search'],
                    // types: {
                    //     '#': {
                    //         max_children: 1,
                    //         max_depth: 4,
                    //         valid_children: ['root']
                    //     },
                    //     default: {
                    //         valid_children: ['default', 'file']
                    //     },
                    //     file: {
                    //         icon: 'fa fa-file',
                    //         valid_children: []
                    //     }
                    // },
                    search: {
                        case_sensitive: false,
                        show_only_matches: true,
                        show_only_matches_children: false,
                        close_opened_onclear: true,
                        search_leaves_only: true,
                    },
                    // 'plugins': ['checkbox', 'contextmenu', 'dnd', 'search', 'sort', 'state', 'types', 'unique', 'wholerow']
                    // 'plugins': ['dnd', 'search', 'sort', 'types', 'unique', 'wholerow', 'json_data', 'changed']
                });
            this.myTreeJs = ($ as any).jstree.reference(treeJQuery);
        }
    }
}
