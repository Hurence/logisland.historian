import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { VisualizationRoutingModule } from './visualization-routing.module';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    VisualizationRoutingModule,
  ],
  declarations: [VisualizationComponent, VisualizationMenuComponent]
})
export class VisualizationModule { }
