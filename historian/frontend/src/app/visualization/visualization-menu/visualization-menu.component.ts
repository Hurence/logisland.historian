import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.css']
})
export class VisualizationMenuComponent implements OnInit {

  private items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'View',
        icon: 'fa fa-fw fa-file-o',
        items: [
          { 
            label: 'Tabular', 
            icon: 'fa fa-fw fa-plus', 
            routerLink: ['./tabular'],
          },
          { label: 'Gauge' },
        ],
        expanded: true,
      },
      {
        label: 'Graph',
        icon: 'fa fa-fw fa-edit',
        items: [
          { 
            label: 'Line Chart', 
            icon: 'fa fa-fw fa-mail-forward',
            routerLink: ['./lineChart'],
          },
          { label: 'Horizon Chart', icon: 'fa fa-fw fa-mail-reply' }
        ],
        expanded: true,
      },
    ];
  }
}
