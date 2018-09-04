import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GraphModule } from '../graph/graph.module';
import { SelectionModule } from '../selection/selection.module';
import { LineChartViewComponent } from './line-chart-view/line-chart-view.component';
import { TabularViewComponent } from './tabular-view/tabular-view.component';
import { VisualizationRoutingModule } from './visualization-routing.module';
import { VisualizationComponent } from './visualization.component';
import { TagModule } from '../tag/tag.module';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';


@NgModule({
  imports: [
    SharedModule,
    SelectionModule,
    GraphModule,
    VisualizationRoutingModule,
    TagModule,
  ],
  declarations: [VisualizationComponent, LineChartViewComponent, TabularViewComponent, VisualizationMenuComponent]
})
export class VisualizationModule { }
