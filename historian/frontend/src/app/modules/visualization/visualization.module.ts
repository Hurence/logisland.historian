import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GraphModule } from '../graph/graph.module';
import { SelectionModule } from '../selection/selection.module';
import { TagModule } from '../tag/tag.module';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';
import { VisualizationComponent } from './visualization.component';
import { GaugeDashboardComponent } from './gauge/gauge-dashboard/gauge-dashboard.component';
import { GaugeFormComponent } from './gauge/gauge-form/gauge-form.component';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  imports: [
    SharedModule,
    SelectionModule,
    GraphModule,
    TagModule,
    DashboardModule,
  ],
  declarations: [VisualizationMenuComponent, VisualizationComponent, GaugeDashboardComponent, GaugeFormComponent]
})
export class VisualizationModule { }
