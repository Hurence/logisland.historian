import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Gauge, GaugeConfigOptions, ZoneRange } from './gauge';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() value?: number;
  @Input() size?: number = 600;
  @Input() label?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() minorTicks?: number = 10;
  @Input() majorTicks?: number = 8;
  @Input() trackMin ?: boolean = false;
  @Input() trackMax ?: boolean = false;
  @Input() trackAvg ?: boolean = false;
  @Input() greenZones ?: ZoneRange[] = [];
  @Input() yellowZones ?: ZoneRange[] = [];
  @Input() redZones ?: ZoneRange[] = [];
  @Input() transitionDuration?: number = 1000;
  @Input() idContainer: string;
  private gauge: Gauge;
  initialized: boolean = false;
  someValueUndefined: boolean = true;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const config = this.createConfig();
    this.initialized = this.tryToInitialized(config, this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gauge) {
      const gaugeUpdate: GaugeConfigOptions = {};
      if (changes.min) {
        gaugeUpdate.min = this.min;
      }
      if (changes.max) {
        gaugeUpdate.max = this.max;
      }
      if (changes.greenZones) {
        gaugeUpdate.greenZones = this.greenZones;
      }
      if (changes.yellowZones) {
        gaugeUpdate.yellowZones = this.yellowZones;
      }
      if (changes.redZones) {
        gaugeUpdate.redZones = this.redZones;
      }
      if (changes.label) {
        gaugeUpdate.label = this.label;
      }
      if (this.tryToInitialized(gaugeUpdate, this.value) && this.renderable()) {
        this.gauge.updateGauge(gaugeUpdate);
        if (changes.value) {
          this.gauge.redraw(this.value, 1000);
        }
        this.someValueUndefined = false;
      } else {
        this.someValueUndefined = true;
        console.error('does not update gauge');
      }
    }
  }

  private tryToInitialized(gaugeUpdate: GaugeConfigOptions, value?: number): boolean {
    if (!this.initialized) {
      if (this.renderable()) {
        this.gauge = new Gauge(this.idContainer, gaugeUpdate);
        this.gauge.render();
        this.gauge.redraw(value, 1000);
        this.someValueUndefined = false;
        return true;
      } else {
        this.someValueUndefined = true;
        console.warn('not renderable');
        return false;
      }
    } else {
      return true;
    }
  }

  private renderable(): boolean {
    if (this.value === undefined || this.value === null) return false;
    if (this.min === undefined || this.min === null) return false;
    if (this.max === undefined || this.max === null) return false;
    if (!this.zonesAreRenderable(this.greenZones)) return false;
    if (!this.zonesAreRenderable(this.yellowZones)) return false;
    if (!this.zonesAreRenderable(this.redZones)) return false;
    return true;
  }

  private zonesAreRenderable(zones: ZoneRange[]): boolean {
    if (!zones) return true;
    for (const zone of zones) {
      if (zone.from === undefined || zone.from === null) return false;
      if (zone.to === undefined || zone.to === null) return false;
    }
    return true;
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
