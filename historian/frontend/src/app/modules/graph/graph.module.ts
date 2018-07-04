import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    LineChartComponent,
  ],
  declarations: [
    LineChartComponent
  ]
})
export class GraphModule { }
