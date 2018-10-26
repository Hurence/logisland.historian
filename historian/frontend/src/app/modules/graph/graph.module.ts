import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    LineChartComponent,
    GaugeChartComponent
  ],
  declarations: [
    LineChartComponent,
    GaugeChartComponent
  ]
})
export class GraphModule { }
