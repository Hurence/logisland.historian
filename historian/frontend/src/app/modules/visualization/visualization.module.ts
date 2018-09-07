import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GraphModule } from '../graph/graph.module';
import { SelectionModule } from '../selection/selection.module';
import { TagModule } from '../tag/tag.module';
import { SelectViewComponent } from './select-view/select-view.component';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';


@NgModule({
  imports: [
    SharedModule,
    SelectionModule,
    GraphModule,
    TagModule,
  ],
  declarations: [VisualizationMenuComponent, SelectViewComponent]
})
export class VisualizationModule { }
