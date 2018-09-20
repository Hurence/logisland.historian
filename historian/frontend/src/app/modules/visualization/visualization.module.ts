import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GraphModule } from '../graph/graph.module';
import { SelectionModule } from '../selection/selection.module';
import { TagModule } from '../tag/tag.module';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';
import { VisualizationComponent } from './visualization.component';


@NgModule({
  imports: [
    SharedModule,
    SelectionModule,
    GraphModule,
    TagModule,
  ],
  declarations: [VisualizationMenuComponent, VisualizationComponent]
})
export class VisualizationModule { }
