import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
// import $ from 'jquery';
import "jquery"; 
declare const $: JQueryStatic;

@Component({
    selector: 'app-js-tree',
    templateUrl: './js-tree.component.html',
    styleUrls: ['./js-tree.component.css']
})
export class JsTreeComponent implements OnInit {

    @ViewChild('dataTree') public dataTree: ElementRef;
    @Input() jsonData: any;

    constructor() { }

    ngOnInit() {        
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('tree changes : ', changes);
        if (changes.jsonData  && changes.jsonData.previousValue !== changes.jsonData.currentValue) this.createDataTree();
      }

    createDataTree() {    
        if (this.jsonData) {
            console.log('initialization of tree with :', this.jsonData);
            let tree = $(this.dataTree.nativeElement).jstree({
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    "themes": {
                        "stripes": true
                    },
                    'data': this.jsonData
                },
                "types": {
                    "#": {
                        "max_children": 1,
                        "max_depth": 4,
                        "valid_children": ["root"]
                    },
                    "default": {
                        "valid_children": ["default", "file"]
                    },
                    "file": {
                        "icon": "fa fa-file",
                        "valid_children": []
                    }
                },
                "plugins": ["search"],
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true,
                    "show_only_matches_children":false,
                    "close_opened_onclear":true
                },
                // "plugins": ["checkbox", "contextmenu", "dnd", "search", "sort", "state", "types", "unique", "wholerow"]
                // "plugins": ["dnd", "search", "sort", "types", "unique", "wholerow", "json_data", "changed"]
            });
        }
        
    }


}
