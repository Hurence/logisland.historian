import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { Gauge } from './gauge';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit, AfterViewInit {

  // @Input() fff: GaugeConfig
  // private arcsToDraw: ArcMeta[];
  private gauge: Gauge;

  constructor() {
    // this.arcsToDraw = [
    //   {
    //     d: this.describeArc(150, 150, 100, 0, 270),
    //     fill: "none",
    //     stroke: "#446688",
    //     strokeWidth: "20"
    //   },
    //   {
    //     d: this.describeArc(150, 150, 70, 180, 10),
    //     fill: "none",
    //     stroke: "#446688",
    //     strokeWidth: "20"
    //   }
    // ]
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const gaugeRefreshFrequency = 5000;
    const config = this.createConfig('Memory', 0, 100);
    this.gauge = new Gauge('memoryGaugeContainer', config);
    this.gauge.render();
    setInterval(() => this.updateGauges(this.gauge), gaugeRefreshFrequency);
  }

  private getRandomValue(gauge) {
    const overflow = 0; // 10;
    return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow * 2) *  Math.random();
  }

  private updateGauges(gauge: Gauge) {
    const value = this.getRandomValue(gauge);
    gauge.redraw(value, 1000);
  }

  private createConfig(label, min, max): void {
    const config: any = {
      size: 600,
      label: label,
      min: undefined !== min ? min : 0,
      max: undefined !== max ? max : 100,
      minorTicks: 5,
      trackMin : true,
      trackMax : true,
      trackAvg : true
    };

    const range = config.max - config.min;
    config.greenZones = [ {
      from : config.min + range * 0.40,
      to : config.min + range * 0.60
    } ];
    config.yellowZones = [ {
      from : config.min + range * 0.20,
      to : config.min + range * 0.40
    }, {
      from : config.min + range * 0.60,
      to : config.min + range * 0.80
    } ];
    config.redZones = [ {
      from : config.min,
      to : config.min + range * 0.20
    }, {
      from : config.min + range * 0.80,
      to : config.max
    } ];

    return config;
  }
}
