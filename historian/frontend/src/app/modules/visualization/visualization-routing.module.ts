import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LineChartComponent } from '../graph/line-chart/line-chart.component';
import { TagDataviewComponent } from '../tag/tag-dataview/tag-dataview.component';
import { TodoComponent } from '../../todo/todo.component';
import { VisualizationComponent } from './visualization.component';
import { LineChartViewComponent } from './line-chart-view/line-chart-view.component';

const visualizationRoutes: Routes = [
  {
    path: 'visualization',
    component: VisualizationComponent,
    children: [
      {
        path: 'tabular',
        component: TagDataviewComponent,
      },
      {
        path: 'lineChart',
        component: LineChartViewComponent ,
      },
      {
        path: 'todo',
        component: TodoComponent,
      },
      {
        path: '',
        redirectTo: 'tabular',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(visualizationRoutes)
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})
export class VisualizationRoutingModule { }
