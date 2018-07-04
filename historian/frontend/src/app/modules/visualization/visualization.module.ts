import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GraphModule } from '../graph/graph.module';
import { SelectionModule } from '../selection/selection.module';
import { LineChartViewComponent } from './line-chart-view/line-chart-view.component';
import { VisualizationRoutingModule } from './visualization-routing.module';
import { VisualizationComponent } from './visualization.component';
import { RefreshRateSelectionComponent } from '../../shared/refresh-rate-selection/refresh-rate-selection.component';


@NgModule({
  imports: [
    SharedModule,
    SelectionModule,
    GraphModule,
    VisualizationRoutingModule,
  ],
  declarations: [VisualizationComponent, LineChartViewComponent]
})
export class VisualizationModule { }
