import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Gauge, GaugeConfigOptions, ZoneRange } from './gauge';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() size?: number = 600;
  @Input() label?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() minorTicks?: number = 10;
  @Input() majorTicks?: number = 8;
  @Input() trackMin ?: boolean = true;
  @Input() trackMax ?: boolean = true;
  @Input() trackAvg ?: boolean = true;
  @Input() greenZones ?: ZoneRange[] = [];
  @Input() yellowZones ?: ZoneRange[] = [];
  @Input() redZones ?: ZoneRange[] = [];
  @Input() transitionDuration?: number = 1000;
  private gauge: Gauge;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {    
    const config = this.createConfig();
    this.gauge = new Gauge('gaugeContainer', config);
    this.gauge.render();
    // setInterval(() => this.updateGauges(this.gauge), 5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gauge) {
      const gaugeUpdate: any = {}
      if (changes.min) {
        gaugeUpdate.min = this.min;      
      }
      if (changes.max) {
        gaugeUpdate.max = this.max;      
      }
      this.gauge.updateGauge(gaugeUpdate);
    }
  }

  private getRandomValue(gauge) {
    const overflow = 0; // 10;
    return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow * 2) *  Math.random();
  }

  private updateGauges(gauge: Gauge) {
    const value = this.getRandomValue(gauge);
    gauge.redraw(value, 1000);
  }

  private createConfig(): GaugeConfigOptions {
    const config: GaugeConfigOptions = {
      size: this.size,
      label: this.label,
      min: this.min,
      max: this.max,
      minorTicks: this.minorTicks,
      majorTicks: this.majorTicks,
      trackMin : this.trackMin,
      trackMax : this.trackMax,
      trackAvg : this.trackAvg,
      greenZones : this.greenZones,
      yellowZones : this.yellowZones,
      redZones : this.redZones,
      transitionDuration: this.transitionDuration
    };
    return config;
  }
}
