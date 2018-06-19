import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { VisualizationRoutingModule } from './visualization-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    VisualizationRoutingModule,
  ],
  declarations: [VisualizationComponent]
})
export class VisualizationModule { }
